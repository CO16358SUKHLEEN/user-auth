const {
    NODE_ENV = "development"
}

const IN_PROD = NODE_ENV === "production";
module.exports = IN_PROD; 