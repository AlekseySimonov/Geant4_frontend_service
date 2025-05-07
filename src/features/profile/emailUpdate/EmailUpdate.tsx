import { AppDispatch } from "@/app/store";
import { useUpdateEmailQuery } from "@/pages/profilePage/api/profileApi";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";


const EmailUpdate: React.FC = () => {
	const { token } = useParams<{ token: string }>();
	const { isError, isSuccess } = useUpdateEmailQuery(token!, {
		skip: !token,
	});
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				showAlert({
					message: "Почта успешно изменена",
					severity: "info",
				})
			);
			navigate("/profile", { replace: true });
		}

		if (isError) {
			dispatch(
				showAlert({
					message: "Не удалось изменить почту",
					severity: "error",
				})
			);
			navigate("/profile", { replace: true });
		}
	}, [isSuccess, isError, dispatch, navigate]);

	useEffect(() => {
		if (!token) {
			navigate("/profile", { replace: true });
		}
	}, [token, navigate]);
		
	return null
}

export default EmailUpdate
