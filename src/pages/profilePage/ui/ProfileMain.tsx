import { useNavigate } from "react-router";
import { useGetProfileQuery } from "../api/profileApi";
import styles from "./_profilePage.module.scss";
import { ProfileCard, ResolvesList } from "@/entities";
import { useEffect } from "react";
import avatarDefault from "@/shared/ui/assets/icons/avatar_light.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getAvatar } from "@/features/avatar";
import { Loader } from "@/shared";

const ProfileMain: React.FC = () => {
	const { data: profileData, isError: isProfileError, isLoading } = useGetProfileQuery();

	const { url: avatarUrl, isLoading: avatarLoading } = useSelector((state: RootState) => state.avatar);
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getAvatar());
	}, [dispatch]);

	if (!profileData) return null

	return (
		<div className={styles.profile}>
			<ProfileCard
				data={profileData}
				onSettingsClick={() => navigate("/profile/settings")}
				avatar={avatarUrl || avatarDefault}
			/>
			<ResolvesList />
			{(avatarLoading || globalLoading) && <Loader />}
		</div>
	);
};

export default ProfileMain;
