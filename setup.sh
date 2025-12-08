#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC}  $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC}  $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_header() {
    echo -e "${PURPLE}$1${NC}"
}

print_progress() {
    echo -e "${CYAN}🔧${NC} $1"
}

# Function to prompt for input with default value
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"

    read -p "$(echo -e "${BLUE}❓${NC} $prompt [$default]: ")" input
    if [ -z "$input" ]; then
        input="$default"
    fi

    # Set the variable dynamically
    eval "$var_name='$input'"
}

# Function to clean username for resource naming
clean_username() {
    local username="$1"
    # Take first part before @ or . and clean it
    local first_part=$(echo "$username" | cut -d'@' -f1 | cut -d'.' -f1)
    # Convert to lowercase, replace spaces and hyphens with underscores, remove special chars
    local cleaned=$(echo "$first_part" | tr '[:upper:]' '[:lower:]' | tr ' -' '__' | sed 's/[^a-z0-9_]//g' | sed 's/__*/_/g' | sed 's/^_//' | sed 's/_$//')
    # Crop to first 12 characters to respect Databricks Apps Name limit
    echo "$cleaned" | cut -c1-12
}

# Function to update or add a value in .env.local
update_env_value() {
    local key="$1"
    local value="$2"
    local comment="$3"

    if grep -q "^${key}=" .env.local 2>/dev/null; then
        # Update existing value
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS sed
            sed -i '' "s|^${key}=.*|${key}=${value}|" .env.local
        else
            # Linux sed
            sed -i "s|^${key}=.*|${key}=${value}|" .env.local
        fi
    else
        # Add new value with comment if provided
        if [ -n "$comment" ]; then
            echo "" >> .env.local
            echo "# $comment" >> .env.local
        fi
        echo "${key}=${value}" >> .env.local
    fi
}

# Function to test databricks connection
test_databricks_connection() {
    local profile="$1"
    print_progress "Testing Databricks connection..."

    if [ -n "$profile" ]; then
        if databricks current-user me --profile "$profile" >/dev/null 2>&1; then
            print_status "Successfully connected to Databricks with profile '$profile'"
            return 0
        else
            print_error "Failed to connect to Databricks with profile '$profile'"
            print_info "Your OAuth credentials may have expired."
            print_info "Run: databricks auth login --profile $profile"
            return 1
        fi
    else
        if databricks current-user me >/dev/null 2>&1; then
            print_status "Successfully connected to Databricks"
            return 0
        else
            print_error "Failed to connect to Databricks"
            return 1
        fi
    fi
}

# Function to install missing dependencies in a virtual environment
install_dependencies() {
    print_header "🔧 Setting up dependencies and virtual environment..."

    # Check for Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 not found. Please install Python 3 first."
        exit 1
    else
        print_status "Python 3 found"
    fi

    # Create virtual environment if it doesn't exist
    if [ ! -d ".venv" ]; then
        print_progress "Creating Python virtual environment..."
        python3 -m venv .venv
        print_status "Virtual environment created"
    else
        print_status "Virtual environment found"
    fi

    # Activate virtual environment
    print_progress "Activating virtual environment..."
    source .venv/bin/activate
    export PATH=".venv/bin:$PATH"
    print_status "Virtual environment activated"

    # Upgrade pip
    print_progress "Upgrading pip..."
    pip install --upgrade pip

    # Install Python dependencies
    print_progress "Installing Python dependencies..."
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    else
        pip install databricks-cli python-terraform
    fi

    # Check for Terraform and install if needed (always install in venv)
    TERRAFORM_IN_VENV=".venv/bin/terraform"
    if [ ! -f "$TERRAFORM_IN_VENV" ]; then
        print_progress "Installing Terraform in virtual environment..."
        
        # Ensure venv/bin directory exists
        mkdir -p .venv/bin
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS - detect architecture
            if [[ $(uname -m) == "arm64" ]]; then
                ARCH="darwin_arm64"
            else
                ARCH="darwin_amd64"
            fi
            print_info "Installing Terraform for macOS ($ARCH)..."
            TERRAFORM_VERSION="1.6.6"
            curl -L -o terraform.zip "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_${ARCH}.zip"
            
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux - detect architecture
            if [[ $(uname -m) == "aarch64" ]]; then
                ARCH="linux_arm64"
            else
                ARCH="linux_amd64"
            fi
            print_info "Installing Terraform for Linux ($ARCH)..."
            TERRAFORM_VERSION="1.6.6"
            curl -L -o terraform.zip "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_${ARCH}.zip"
            
        else
            print_warning "Unsupported OS for automatic Terraform installation"
            print_info "Please install Terraform manually: https://developer.hashicorp.com/terraform/downloads"
            print_info "Place the terraform binary in: .venv/bin/terraform"
            return 1
        fi
        
        # Extract and install
        if [ -f "terraform.zip" ]; then
            unzip -q terraform.zip
            if [ -f "terraform" ]; then
                mv terraform "$TERRAFORM_IN_VENV"
                chmod +x "$TERRAFORM_IN_VENV"
                rm terraform.zip
                print_status "Terraform installed in virtual environment"
            else
                print_error "Failed to extract Terraform binary"
                rm -f terraform.zip
                return 1
            fi
        else
            print_error "Failed to download Terraform"
            return 1
        fi
    else
        print_status "Terraform found in virtual environment"
    fi

    # Verify Databricks CLI (must be modern CLI, not old Python version)
    if ! command -v databricks &> /dev/null; then
        print_error "Databricks CLI not found"
        print_info "Install from: https://docs.databricks.com/dev-tools/cli/install.html"
        exit 1
    else
        DATABRICKS_VERSION=$(databricks --version 2>/dev/null || echo "unknown")
        
        # Check if it's the modern CLI (v0.200+) vs old Python CLI (v0.18.x)
        if [[ "$DATABRICKS_VERSION" =~ "0.18" ]] || [[ "$DATABRICKS_VERSION" =~ "0.17" ]]; then
            print_error "Found old Python-based Databricks CLI: $DATABRICKS_VERSION"
            print_warning "The old CLI is deprecated and won't work with this workshop"
            print_info "Please install the modern Databricks CLI from:"
            print_info "  https://docs.databricks.com/dev-tools/cli/install.html"
            print_info ""
            print_info "If using Homebrew: brew tap databricks/tap && brew install databricks"
            exit 1
        fi
        
        print_status "Databricks CLI found: $DATABRICKS_VERSION"
    fi

    # Verify Terraform (check in venv first, then system)
    if [ -f ".venv/bin/terraform" ]; then
        TERRAFORM_VERSION=$(.venv/bin/terraform --version | head -1 | cut -d' ' -f2 2>/dev/null || echo "unknown")
        print_status "Terraform found in venv: $TERRAFORM_VERSION"
    elif command -v terraform &> /dev/null; then
        TERRAFORM_VERSION=$(terraform --version | head -1 | cut -d' ' -f2 2>/dev/null || echo "unknown")
        print_status "Terraform found in system: $TERRAFORM_VERSION"
    else
        print_error "Terraform installation failed"
        print_info "Please install Terraform manually: https://developer.hashicorp.com/terraform/downloads"
        print_info "Or place the terraform binary in: .venv/bin/terraform"
        exit 1
    fi

    # Check for Node.js/npm for frontend
    if ! command -v node &> /dev/null; then
        print_warning "Node.js not found. You'll need it for local frontend development."
        print_info "Visit: https://nodejs.org/ to install Node.js"
    else
        NODE_VERSION=$(node --version 2>/dev/null || echo "unknown")
        print_status "Node.js found: $NODE_VERSION"
    fi

    print_status "All dependencies verified"
}

# Main setup function
main() {
    clear
    echo -e "${PURPLE}🎓 Prototyping with Confidence on Databricks - Setup${NC}"
    echo -e "${PURPLE}======================================================${NC}"
    echo ""
    echo "This script will set up your personal workshop environment with:"
    echo "• Your own Unity Catalog with sample data"
    echo "• Custom MCP server deployed as a Databricks App"
    echo "• Local development environment"
    echo ""

    # Install dependencies first
    install_dependencies

    # Get participant information
    print_header "👤 Participant Setup"

    # Get current system username as default
    CURRENT_USER=$(whoami)
    prompt_with_default "Enter your workshop username/identifier" "$CURRENT_USER" "PARTICIPANT_NAME"

    # Clean the username for resource naming
    CLEAN_PREFIX=$(clean_username "$PARTICIPANT_NAME")

    print_info "Your resource prefix will be: ${CLEAN_PREFIX}"
    print_info "This will create resources like:"
    print_info "  • Catalog: mcp_workshop_${CLEAN_PREFIX}"
    print_info "  • Custom MCP Server App: mcp-custom-server-${CLEAN_PREFIX} (deployed separately in Step 8)"
    echo ""

    read -p "$(echo -e "${BLUE}❓${NC} Continue with this setup? (y/N): ")" confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi

    # Databricks Authentication Setup
    print_header "🔐 Databricks Authentication"

    # Check if .env.local already exists
    if [ -f ".env.local" ]; then
        print_info "Found existing .env.local file."
        read -p "$(echo -e "${BLUE}❓${NC} Do you want to update it? (y/N): ")" update_env
        if [[ ! "$update_env" =~ ^[Yy]$ ]]; then
            print_info "Using existing configuration."
            source .env.local 2>/dev/null || true
            skip_auth=true
        fi
    fi

    if [ "$skip_auth" != "true" ]; then
        # Initialize .env.local file if it doesn't exist
        if [ ! -f ".env.local" ]; then
            echo "# Prototyping with Confidence on Databricks - Configuration" > .env.local
            echo "# Generated on $(date)" >> .env.local
            echo "# Participant: $PARTICIPANT_NAME" >> .env.local
            echo "" >> .env.local
        fi

        echo "Choose authentication method:"
        echo "1. Personal Access Token (PAT)"
        echo "2. Configuration Profile - Recommended"
        echo ""

        read -p "$(echo -e "${BLUE}❓${NC} Select option (1 or 2): ")" auth_choice

        if [ "$auth_choice" = "1" ]; then
            # PAT Authentication
            print_progress "Setting up Personal Access Token authentication..."

            update_env_value "DATABRICKS_AUTH_TYPE" "pat" "Authentication method"

            if [ -z "$DATABRICKS_HOST" ]; then
                prompt_with_default "Databricks Workspace URL" "https://your-workspace.cloud.databricks.com" "DATABRICKS_HOST"
            else
                prompt_with_default "Databricks Workspace URL" "$DATABRICKS_HOST" "DATABRICKS_HOST"
            fi

            update_env_value "DATABRICKS_HOST" "$DATABRICKS_HOST" "Databricks workspace URL"

            if [ -z "$DATABRICKS_TOKEN" ]; then
                echo ""
                print_info "Create a Personal Access Token here:"
                print_info "🔗 $DATABRICKS_HOST/settings/user/developer/access-tokens"
                echo ""
                read -s -p "$(echo -e "${BLUE}🔑${NC} Enter your Databricks Personal Access Token: ")" DATABRICKS_TOKEN
                echo ""
            fi

            update_env_value "DATABRICKS_TOKEN" "$DATABRICKS_TOKEN"

            # Test PAT authentication
            # Clear conflicting profile variables to ensure clean PAT auth
            unset DATABRICKS_CONFIG_PROFILE
            export DATABRICKS_HOST="$DATABRICKS_HOST"
            export DATABRICKS_TOKEN="$DATABRICKS_TOKEN"

            if ! test_databricks_connection; then
                print_error "Authentication failed. Please check your host URL and token."
                print_info "Please verify:"
                print_info "  1. Your Databricks workspace URL is correct: $DATABRICKS_HOST"
                print_info "  2. Your Personal Access Token is valid and not expired"
                print_info "  3. You have permissions to create resources in the workspace"
                exit 1
            fi

        elif [ "$auth_choice" = "2" ]; then
            # Profile Authentication
            print_progress "Setting up configuration profile authentication..."

            update_env_value "DATABRICKS_AUTH_TYPE" "profile" "Authentication method"

            # List existing profiles
            print_info "Available profiles:"
            if [ -f "$HOME/.databrickscfg" ]; then
                grep '^\[' "$HOME/.databrickscfg" | sed 's/\[//g' | sed 's/\]//g' | sed 's/^/  - /'
            else
                print_info "  No existing profiles found"
            fi
            echo ""

            # Detect OAuth profiles (avoid token-based profiles)
            OAUTH_PROFILES=$(grep -A 2 '^\[' ~/.databrickscfg 2>/dev/null | grep -B 1 'auth_type.*databricks-cli' | grep '^\[' | sed 's/\[//g' | sed 's/\]//g' | head -3 | tr '\n' ' ')
            
            if [ -n "$OAUTH_PROFILES" ]; then
                SUGGESTED_PROFILE=$(echo "$OAUTH_PROFILES" | awk '{print $1}')
                print_info "Detected OAuth profiles: $OAUTH_PROFILES"
                print_info "Recommending: $SUGGESTED_PROFILE (uses OAuth, not PAT)"
                prompt_with_default "Databricks Config Profile" "${SUGGESTED_PROFILE}" "DATABRICKS_CONFIG_PROFILE"
            else
                prompt_with_default "Databricks Config Profile" "${DATABRICKS_CONFIG_PROFILE:-DEFAULT}" "DATABRICKS_CONFIG_PROFILE"
            fi

            update_env_value "DATABRICKS_CONFIG_PROFILE" "$DATABRICKS_CONFIG_PROFILE" "Databricks profile name"

            # Clear PAT credentials when using profile to avoid conflicts
            # Remove the lines entirely from .env.local to prevent conflicts
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS sed
                sed -i '' '/^DATABRICKS_HOST=/d' .env.local 2>/dev/null || true
                sed -i '' '/^DATABRICKS_TOKEN=/d' .env.local 2>/dev/null || true
            else
                # Linux sed
                sed -i '/^DATABRICKS_HOST=/d' .env.local 2>/dev/null || true
                sed -i '/^DATABRICKS_TOKEN=/d' .env.local 2>/dev/null || true
            fi

            # Test profile authentication
            # Clear all conflicting environment variables to ensure clean profile auth
            unset DATABRICKS_HOST DATABRICKS_TOKEN DATABRICKS_AUTH_TYPE
            unset DATABRICKS_CLIENT_ID DATABRICKS_CLIENT_SECRET DATABRICKS_AZURE_CLIENT_ID
            export DATABRICKS_CONFIG_PROFILE
            
            if ! test_databricks_connection "$DATABRICKS_CONFIG_PROFILE"; then
                print_error "Profile '$DATABRICKS_CONFIG_PROFILE' not found or invalid."
                print_info "Configure it with: databricks configure --profile $DATABRICKS_CONFIG_PROFILE"
                exit 1
            fi

        else
            print_error "Invalid option. Please run setup again."
            exit 1
        fi
    fi

    # Generate user-specific configuration
    print_header "⚙️ Generating Workshop Configuration"

    # Ask about catalog setup
    echo ""
    echo -e "${BLUE}❓${NC} Do you want to:"
    echo "   1. Create a new catalog (default - requires catalog creation permissions)"
    echo "   2. Use an existing catalog (recommended for serverless workspaces)"
    read -p "$(echo -e "${BLUE}Choose option (1/2) [1]:${NC} ")" catalog_option
    
    catalog_option=${catalog_option:-1}
    
    if [[ "$catalog_option" == "2" ]]; then
        echo ""
        print_info "Checking available catalogs in your workspace..."
        if databricks catalogs list --output table 2>/dev/null; then
            echo ""
        else
            print_warning "Unable to list catalogs automatically"
        fi
        echo ""
        read -p "$(echo -e "${BLUE}Enter catalog name to use:${NC} ")" WORKSHOP_CATALOG
        CREATE_CATALOG="false"
        print_info "Will use existing catalog: ${WORKSHOP_CATALOG}"
    else
        WORKSHOP_CATALOG="mcp_workshop_${CLEAN_PREFIX}"
        CREATE_CATALOG="true"
        print_info "Will create new catalog: ${WORKSHOP_CATALOG}"
    fi
    echo ""

    # Update configuration
    update_env_value "PARTICIPANT_NAME" "$PARTICIPANT_NAME" "Workshop participant information"
    update_env_value "PARTICIPANT_PREFIX" "$CLEAN_PREFIX"
    update_env_value "WORKSHOP_CATALOG" "$WORKSHOP_CATALOG" "Workshop resources"
    update_env_value "MCP_APP_NAME" "mcp-custom-server-${CLEAN_PREFIX}" "Custom MCP Server app name"
    update_env_value "CREATE_CATALOG" "$CREATE_CATALOG" "Catalog creation mode"

    print_status "Configuration saved to .env.local"

    # Store participant info for later cleanup reference
    cat > ".participant_${CLEAN_PREFIX}.info" << EOF
# Workshop participant information
PARTICIPANT_NAME="${PARTICIPANT_NAME}"
PARTICIPANT_PREFIX="${CLEAN_PREFIX}"
WORKSHOP_CATALOG="${WORKSHOP_CATALOG}"
MCP_APP_NAME="mcp-custom-server-${CLEAN_PREFIX}"
CREATE_CATALOG="${CREATE_CATALOG}"
CREATED_DATE="$(date)"
EOF

    print_status "Saved participant configuration for cleanup reference"

    # Deploy workshop resources
    print_header "🚀 Deploying Your Workshop Environment"
    print_info "This will create your personal workshop resources (catalog, sample data, setup jobs)..."
    print_info "Note: The MCP server app will be deployed separately in the workshop (Step 8)"

    print_progress "Deploying Databricks bundle (jobs only, no apps)..."
    
    # Ensure virtual environment is activated and environment variables are available
    if [ -f ".venv/bin/activate" ]; then
        source .venv/bin/activate
        export PATH=".venv/bin:$PATH"
    fi
    
    if [ -f ".env.local" ]; then
        source .env.local
        
        # Clean up conflicting environment variables based on auth type
        if [ "$DATABRICKS_AUTH_TYPE" = "profile" ]; then
            # For profile auth, completely unset PAT credentials to avoid conflicts
            unset DATABRICKS_HOST
            unset DATABRICKS_TOKEN
            export DATABRICKS_CONFIG_PROFILE
            # Also clear from current shell environment
            export -n DATABRICKS_HOST DATABRICKS_TOKEN 2>/dev/null || true
        else
            # For PAT auth, unset profile to avoid conflicts
            unset DATABRICKS_CONFIG_PROFILE
            export DATABRICKS_HOST DATABRICKS_TOKEN
            export -n DATABRICKS_CONFIG_PROFILE 2>/dev/null || true
        fi
        export DATABRICKS_AUTH_TYPE
    fi
    
    # Add debugging information
    print_info "Using authentication type: ${DATABRICKS_AUTH_TYPE:-not set}"
    if [ "$DATABRICKS_AUTH_TYPE" = "pat" ]; then
        print_info "Using PAT authentication with host: ${DATABRICKS_HOST:-not set}"
        print_info "Token length: ${#DATABRICKS_TOKEN} characters"
    elif [ "$DATABRICKS_AUTH_TYPE" = "profile" ]; then
        print_info "Using profile authentication: ${DATABRICKS_CONFIG_PROFILE:-not set}"
    fi
    
    # Deploy with appropriate authentication method
    if [ "$DATABRICKS_AUTH_TYPE" = "profile" ] && [ -n "$DATABRICKS_CONFIG_PROFILE" ]; then
        # Use profile-based authentication with explicit auth method override
        print_info "Forcing profile-only authentication..."
        
        # Aggressively clear all conflicting auth environment variables
        OLD_HOST="$DATABRICKS_HOST"
        OLD_TOKEN="$DATABRICKS_TOKEN"
        unset DATABRICKS_HOST DATABRICKS_TOKEN DATABRICKS_AUTH_TYPE
        # Also clear any other potential conflicting vars
        unset DATABRICKS_CLIENT_ID DATABRICKS_CLIENT_SECRET DATABRICKS_AZURE_CLIENT_ID
        
        if databricks bundle deploy -t dev --profile "$DATABRICKS_CONFIG_PROFILE" \
            --var="participant_prefix=${CLEAN_PREFIX}" \
            --var="workshop_catalog=${WORKSHOP_CATALOG}" \
            --var="create_catalog=${CREATE_CATALOG}"; then
            print_status "Bundle deployed successfully"
        else
            print_error "Bundle deployment failed with profile authentication"
            print_info "The profile may contain conflicting authentication methods."
            print_info "Try running: databricks auth login --profile $DATABRICKS_CONFIG_PROFILE"
            exit 1
        fi
        
        # Restore variables if they existed (though they shouldn't for profile auth)
        [ -n "$OLD_HOST" ] && export DATABRICKS_HOST="$OLD_HOST"
        [ -n "$OLD_TOKEN" ] && export DATABRICKS_TOKEN="$OLD_TOKEN"
    else
        # Use PAT authentication (default)
        if databricks bundle deploy -t dev \
            --var="participant_prefix=${CLEAN_PREFIX}" \
            --var="workshop_catalog=${WORKSHOP_CATALOG}" \
            --var="create_catalog=${CREATE_CATALOG}"; then
            print_status "Bundle deployed successfully"
        else
            print_error "Bundle deployment failed with PAT authentication"
            print_info "Please check:"
            print_info "  1. Your token is valid: databricks current-user me"
            print_info "  2. You have permissions to create apps and jobs"
            print_info "  3. Your workspace supports Databricks Apps (for MCP server)"
            print_info ""
            print_info "You can also try using profile authentication instead:"
            print_info "  databricks configure --profile your-profile-name"
            print_info "  Then re-run this setup script and choose profile authentication"
            exit 1
        fi
    fi

    print_progress "Setting up your workshop catalog and sample data..."
    
    # Use the same authentication method for bundle run as for deploy
    if [ "$DATABRICKS_AUTH_TYPE" = "profile" ] && [ -n "$DATABRICKS_CONFIG_PROFILE" ]; then
        # Clear conflicting auth variables for bundle run too
        unset DATABRICKS_HOST DATABRICKS_TOKEN DATABRICKS_AUTH_TYPE
        unset DATABRICKS_CLIENT_ID DATABRICKS_CLIENT_SECRET DATABRICKS_AZURE_CLIENT_ID
        
        if databricks bundle run setup_workshop_resources -t dev --profile "$DATABRICKS_CONFIG_PROFILE" \
            --var="participant_prefix=${CLEAN_PREFIX}" \
            --var="workshop_catalog=${WORKSHOP_CATALOG}"; then
            print_status "Workshop resources created successfully"
        else
            print_warning "Resource setup encountered issues, but continuing..."
        fi
    else
        if databricks bundle run setup_workshop_resources -t dev \
            --var="participant_prefix=${CLEAN_PREFIX}" \
            --var="workshop_catalog=${WORKSHOP_CATALOG}"; then
            print_status "Workshop resources created successfully"
        else
            print_warning "Resource setup encountered issues, but continuing..."
        fi
    fi

    # Set up custom MCP server template
    print_header "⚙️ Setting Up Your Custom MCP Server"
    print_info "Configuring the custom MCP server template for hands-on learning..."

    if [ -d "custom-mcp-template" ]; then
        cd custom-mcp-template

        # Create workshop-specific configuration
        print_progress "Creating workshop configuration..."
        
        # Create .env.local for the MCP template
        if [ ! -f ".env.local" ]; then
            # Ensure DATABRICKS_HOST is available
            if [ -z "$DATABRICKS_HOST" ]; then
                source ../.env.local 2>/dev/null || true
                # If still empty and using profile auth, get from databricks config
                if [ -z "$DATABRICKS_HOST" ] && [ "$DATABRICKS_AUTH_TYPE" = "profile" ]; then
                    # Try to get host from databricks config file
                    if [ -f ~/.databrickscfg ]; then
                        # First try the configured profile
                        if [ -n "$DATABRICKS_CONFIG_PROFILE" ]; then
                            DATABRICKS_HOST=$(grep -A 10 "\[$DATABRICKS_CONFIG_PROFILE\]" ~/.databrickscfg | grep "^host" | head -1 | cut -d'=' -f2 | xargs)
                        fi

                        # If still empty, try common profile names
                        if [ -z "$DATABRICKS_HOST" ]; then
                            for profile in "DEFAULT" "default" "dev" "development" "staging" "prod" "production"; do
                                DATABRICKS_HOST=$(grep -A 10 "\[$profile\]" ~/.databrickscfg | grep "^host" | head -1 | cut -d'=' -f2 | xargs 2>/dev/null)
                                if [ -n "$DATABRICKS_HOST" ]; then
                                    break
                                fi
                            done
                        fi

                        # If still empty, try any profile with a host
                        if [ -z "$DATABRICKS_HOST" ]; then
                            DATABRICKS_HOST=$(grep "^host" ~/.databrickscfg | head -1 | cut -d'=' -f2 | xargs 2>/dev/null)
                        fi
                    fi
                    # If still empty, try to get from workspace info
                    if [ -z "$DATABRICKS_HOST" ]; then
                        DATABRICKS_HOST=$(databricks workspace get-status 2>/dev/null | grep -o 'https://[^[:space:]]*' | head -1 || echo "")
                    fi
                fi
                export DATABRICKS_HOST
            fi
            
            # Create .env.local with workshop variables
            cat > .env.local << EOF
# Workshop MCP Server Configuration
# Generated for: ${PARTICIPANT_NAME}
DATABRICKS_HOST=${DATABRICKS_HOST}
DATABRICKS_TOKEN=${DATABRICKS_TOKEN}
EOF
            print_status "Created .env.local configuration"
        fi
        
        # Install dependencies
        print_progress "Installing MCP server dependencies..."
        if command -v uv &> /dev/null; then
            uv sync --quiet || print_warning "uv sync encountered issues (non-fatal)"
        else
            print_warning "uv not found - dependencies will be installed on first run"
        fi

        cd ..
    else
        print_warning "Custom MCP template directory not found"
    fi

    # Install frontend dependencies
    if [ -d "frontend" ] && command -v npm &> /dev/null; then
        print_progress "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
        print_status "Frontend dependencies installed"

        # Update frontend environment for this participant
        cat > "frontend/.env.local" << EOF
NEXT_PUBLIC_WORKSHOP_CATALOG=${WORKSHOP_CATALOG}
NEXT_PUBLIC_WORKSHOP_SCHEMA=default
NEXT_PUBLIC_PARTICIPANT_NAME=${PARTICIPANT_NAME}
NEXT_PUBLIC_DATABRICKS_HOST=${DATABRICKS_HOST}
EOF
        print_status "Frontend configured for your workshop instance"
    fi

    # Setup complete!
    print_header "🎉 Workshop Setup Complete!"
    echo ""
    print_status "Your personal workshop environment is ready!"
    echo ""
    echo -e "${CYAN}📋 Your Workshop Resources:${NC}"
    echo "   • Catalog: ${WORKSHOP_CATALOG}"
    echo "   • MCP App Name (for Step 8): mcp-custom-server-${CLEAN_PREFIX}"
    echo ""
    echo -e "${CYAN}🚀 Next Steps:${NC}"
    echo "   1. Start the frontend: cd frontend && npm run dev"
    echo "   2. Visit: http://localhost:3000"
    echo "   3. Follow Step 8 in the workshop to deploy your custom MCP server"
    echo "   4. Deploy command: cd custom-mcp-template && databricks bundle deploy --var=\"participant_prefix=${CLEAN_PREFIX}\""
    echo ""
    echo -e "${CYAN}🔧 Configuration Files Created:${NC}"
    echo "   • .env.local - Your workshop configuration (includes MCP_APP_NAME)"
    echo "   • .participant_${CLEAN_PREFIX}.info - Participant info for cleanup"
    echo "   • frontend/.env.local - Frontend configuration"
    echo "   • custom-mcp-template/.env.local - MCP server configuration"
    echo "   • .venv/ - Python virtual environment with all dependencies"
    echo ""
    echo -e "${CYAN}💡 Important Notes:${NC}"
    echo "   • All Databricks CLI and Terraform commands are available in the virtual environment"
    echo "   • To activate manually: source .venv/bin/activate"
    echo "   • Virtual environment includes: Databricks CLI, Terraform, and Python tools"
    echo "   • The MCP server app will be created when you run Step 8 of the workshop"
    echo ""
    echo -e "${GREEN}Happy learning with Databricks MCP! 🚀${NC}"

    # Optional: Open browser to localhost
    if command -v open &> /dev/null; then
        read -p "$(echo -e "${BLUE}❓${NC} Open workshop in browser? (y/N): ")" open_browser
        if [[ "$open_browser" =~ ^[Yy]$ ]]; then
            print_info "Opening workshop in your browser..."
            (cd frontend && npm run dev &)
            sleep 3
            open "http://localhost:3000"
        fi
    fi
}

# Run main function
main "$@"