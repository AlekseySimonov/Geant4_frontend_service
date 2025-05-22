import { useNavigate, useParams } from "react-router";
import styles from "./_article.module.scss"
import { useGetArticleQuery } from "@/pages/documentationPage/api/docApi";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { LatexPreview } from "@/entities/latexTextField";
import { CsvGraph } from "./CsvGraph";
import { ImageSlider } from "./ImageSlider";
const Article: React.FC = () => {
	const { id } = useParams();
	const { data: article, error } = useGetArticleQuery(Number(id));

	const navigate  = useNavigate()

	if (!article) return null;

	return (
		<div className={styles.article}>
			<div className={styles.article__title}>
				<ArrowBackIosRoundedIcon style={{ fontSize: 24 }} onClick={() => navigate('/documentation/articles')} />
				<h2>{article.title}</h2>
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
								<LatexPreview value={element.text} />
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
	);
};

export default Article;