import Keycloak from "keycloak-js";
import { Role } from "src/stores/auth-store";

const CLIENT_ID = "ai-appstore-frontend";
const KEYCLOAK_URL = "https://keycloak.apps-crc.testing";
const KEYCLOAK_REALM = "CommonServices";

const initOptions = {
    realm: KEYCLOAK_REALM,
    url: KEYCLOAK_URL,
    "ssl-required": "external",
    clientId: CLIENT_ID,
    "public-client": true,
    "confidential-port": 0,
}

const minTokenValidityInSeconds = -1;

const keycloakInstance = new Keycloak(initOptions);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const Login = () => {
    const isAuthenticated = keycloakInstance.init({onLoad: "login-required"});
    return isAuthenticated
};

const UserId = (): string | undefined =>
    keycloakInstance?.tokenParsed?.sub;

const UserName = (): string | undefined =>
    keycloakInstance?.tokenParsed?.preferred_username;

const FullName = (): string | undefined =>
    keycloakInstance?.tokenParsed?.name;

const Token = (): string | undefined => keycloakInstance?.token;

const Logout = () => keycloakInstance.logout();

const RefreshToken = async () => {
    try {
        const isTokenUpdated =  await keycloakInstance.updateToken(minTokenValidityInSeconds)
        return isTokenUpdated
    } catch (err) {
        console.error("Failed to refresh token!");
    }
}

const UserRoles = (): string[] | undefined => {
    if (keycloakInstance.resourceAccess == undefined) {
        return undefined;
    }
    return keycloakInstance.resourceAccess[CLIENT_ID].roles;
}

const isLoggedIn = () => !!keycloakInstance.token;

const KeyCloakService = {
    CallLogin: Login,
    GetUserId: UserId,
    GetUserName: UserName,
    GetFullName: FullName,
    GetAccessToken: Token,
    CallLogOut: Logout,
    GetUserRoles: UserRoles,
    CallIsLoggedIn: isLoggedIn,
    CallRefreshToken: RefreshToken
};

export default KeyCloakService;