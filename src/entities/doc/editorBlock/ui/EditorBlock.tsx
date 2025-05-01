import { Form, Formik } from "formik";
import styles from "./_editorBlock.module.scss"
import { ArticlesTypes } from "@/shared/types";
import { FormField } from "@/shared";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const initialValues: ArticlesTypes = {
	title: '',
	description: '',
};

interface EditorBlockProps {
	index: number;
	onRemove: () => void;
}

const EditorBlock: React.FC<EditorBlockProps> = ({index, onRemove}) => {
	return (
		<div className={styles.block}>
			<ClearRoundedIcon onClick={onRemove} style={{ fontSize: 25 }} className={styles.block__remover} />
			<FormField name={`subscriptions.${index}.title`} placeholder="Заголовок блока" />
			<FormField
				name={`subscriptions.${index}.elements[0].text`}
				placeholder="Текстовый элемент"
				isMultiline
			/>
		</div>
	);
};

export default EditorBlock