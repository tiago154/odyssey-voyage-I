set -a # automatically export all variables
source ./.env
set +a
APOLLO_KEY=$APOLLO_KEY APOLLO_GRAPH_REF=$APOLLO_GRAPH_REF ./router --config ./config.yaml