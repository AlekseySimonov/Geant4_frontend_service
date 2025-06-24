let navigate: ((to: string) => void) | null = null;

export const setNavigator = (navFn: (to: string) => void) => {
	navigate = navFn;
};


export const redirectToLogin = () => {
	if (navigate) {
		navigate("/auth/login");
	}
};