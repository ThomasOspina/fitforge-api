declare const _default: () => {
    app: {
        port: number;
    };
    database: {
        url: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        expiresIn: string | undefined;
        refreshExpiresIn: string | undefined;
    };
};
export default _default;
