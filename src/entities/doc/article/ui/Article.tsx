import { useLocation, useNavigate, useParams } from "react-router";
import styles from "./_article.module.scss"
import { useDeleteFavoriteMutation, useGetArticleQuery, useGetFavoritesQuery, useGetStaffQuery, usePostFavoriteMutation } from "@/pages/documentationPage/api/docApi";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { CsvGraph } from "./CsvGraph";
import { ImageSlider } from "./ImageSlider";
import { Checkbox, IconButton } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Preview } from "@/entities/markdownTextField";
import { usePopup } from "@/shared/hooks";
import { ModalWindow } from "@/shared/ui/components/modal";
import { DeleteArticle } from "./DeleteArticle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Loader } from "@/shared";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useMemo } from "react";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { SEOArticle } from "../model";

const Article: React.FC = () => {
	const dispatch = useDispatch()
	const { data: isStaff } = useGetStaffQuery()
	const { id } = useParams();
	const { data: article, error } = useGetArticleQuery(Number(id));

	const { data: favorites } = useGetFavoritesQuery();
	const [postFavorite] = usePostFavoriteMutation()
	const [deleteFavorite] = useDeleteFavoriteMutation()

	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading)

	const navigate = useNavigate()
	const location = useLocation()

	const isFavorite = useMemo(() => {
		if (!favorites || !article) return false;
		return favorites.some(fav => fav.id === article.id);
	}, [favorites, article]);

	const handleFavoriteToggle = async () => {
		if (!article) return;

		try {
			if (isFavorite) {
				await deleteFavorite(article.id).unwrap();
			} else {
				if (favorites.length >= 8) {
					dispatch(showAlert({
						message: 'Количество избранных статей не должно превышать 8',
						severity: 'error',
					}));
					return
				}
				await postFavorite({ article: article.id }).unwrap();
			}
		} catch (err) {
			dispatch(showAlert({
				message: 'Произошла ошибка при обновлении избранного',
				severity: 'error',
			}));
		}
	};

	const handleBackClick = () => {
		if (location.state?.from) {
			navigate(location.state?.from);
		} else {
			navigate('/documentation/articles');
		}
	};

	const deleteArticle = usePopup()

	if (!article) return null;

	return (
		<>
			<SEOArticle
				title={`${article.title} — Документация`}
				description={article.description}
			/>
			<div className={styles.article}>
				<div className={styles.article__title}>
					<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={handleBackClick} />
					<h2>{article.title}</h2>
					<div>
						<Checkbox
							icon={<BookmarkBorderIcon sx={{ color: 'primary.main' }} />}
							checkedIcon={<BookmarkIcon sx={{ color: 'primary.main' }} />}
							checked={isFavorite}
							onChange={handleFavoriteToggle}
						/>
					</div>
					{isStaff?.is_staff && (
						<div className={styles.devTools}>
							<IconButton onClick={() => navigate(`/documentation/articles/editor/${id}`)}>
								<CreateOutlinedIcon style={{ fontSize: 25 }} color="inherit" />
							</IconButton>
							<IconButton onClick={deleteArticle.openPopup} >
								<DeleteOutlineOutlinedIcon style={{ fontSize: 25 }} color="inherit" />
							</IconButton>
						</div>
					)}
				</div>
				<div className={styles.article__block}>
					<h4>Описание</h4>
					<div className={styles.article__block__content}>
						<p>{article.description}</p>
					</div>
				</div>

				{article.subscriptions?.map((block, idx) => (
					<div key={block.id || idx} className={styles.article__block}>
						<h4>{block.title}</h4>
						{block.elements.map((element, elIdx) => (
							<div key={element.id || elIdx} className={styles.article__element}>
								{element.type === "text" && (
									<Preview value={element.text} />
								)}
								{element.type === "csv" && element.files.length > 0 && (
									<CsvGraph url={element.files[0].url} />
								)}
								{element.type === "webp" && element.files.length > 0 && (
									<ImageSlider urls={element.files.map(f => f.url)} />
								)}
							</div>
						))}
					</div>
				))}
			</div>
			<ModalWindow open={deleteArticle.isVisible} onClose={deleteArticle.closePopup}>
				<DeleteArticle onClose={deleteArticle.closePopup} articleId={Number(id)} />
				{globalLoading && <Loader />}
			</ModalWindow>
		</>

	);
};

export default Article;