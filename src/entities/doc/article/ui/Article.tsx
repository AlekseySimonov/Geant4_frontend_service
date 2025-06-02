import { useLocation, useNavigate, useParams } from "react-router";
import styles from "./_article.module.scss"
import { useGetArticleQuery, useGetStaffQuery } from "@/pages/documentationPage/api/docApi";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { CsvGraph } from "./CsvGraph";
import { ImageSlider } from "./ImageSlider";
import { IconButton } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Preview } from "@/entities/markdownTextField";
import { usePopup } from "@/shared/hooks";
import { ModalWindow } from "@/shared/ui/components/modal";
import { DeleteArticle } from "./DeleteArticle";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Loader } from "@/shared";

const Article: React.FC = () => {
	const { data: isStaff } = useGetStaffQuery()
	const { id } = useParams();
	const { data: article, error } = useGetArticleQuery(Number(id));

	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading)

	const navigate = useNavigate()
	const location = useLocation()

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
			<div className={styles.article}>
				<div className={styles.article__title}>
					<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={handleBackClick} />
					<h2>{article.title}</h2>
					{isStaff?.is_staff && (
						<div className={styles.devTools}>
							<IconButton onClick={() => navigate(`/documentation/articles/editor/${id}`)}>
								<CreateOutlinedIcon style={{ fontSize: 25 }} />
							</IconButton>
							<IconButton onClick={deleteArticle.openPopup} >
								<DeleteOutlineOutlinedIcon style={{ fontSize: 25 }} />
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