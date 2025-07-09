import React, { useEffect, useState, useCallback } from "react";
import styles from "./_resolvesList.module.scss";
import { ResolveCard } from "@/entities";
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { FiltersUrl } from "@/entities";
import { useNavigate, useSearchParams } from "react-router";
import { CircularProgress, Pagination } from "@mui/material";
import { useGetCategoriesQuery, useGetTagsQuery } from "@/pages/examplesPage/api/examplesApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { queryProfile } from "@/pages/profilePage/api/queryProfile";
import { MyExamplesTypes, ParsedMyExample, RawMyExamplesPage } from "@/shared/types";
const ResolvesList: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const { data: categories = [] } = useGetCategoriesQuery();
	const { data: tags = [] } = useGetTagsQuery();

	const [searchExamples, { isFetching }] = queryProfile.useLazySearchMyExamplesQuery();
	const [searchAutocomplete] = queryProfile.useLazySearchMyExamplesQuery();

	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading);

	const [examples, setExamples] = useState<ParsedMyExample[]>([]);
	const [pageCount, setPageCount] = useState(1);

	const categoryParam = searchParams.get("category");
	const tagParam = searchParams.get("tags");
	const orderingParam = searchParams.get("ordering");
	const searchParam = searchParams.get("query");
	const pageParam = parseInt(searchParams.get("page") || "1", 10);

	const fetchExamples = useCallback(async () => {
		const result = await searchExamples({
			category: categoryParam || "",
			tag: tagParam || "",
			query: searchParam || "",
			page: pageParam || 1,
			ordering: orderingParam || "",
		});

		if ("data" in result && Array.isArray(result.data)) {
			const rawData = result.data;

			const pageCountEntry = rawData.find(
				(item): item is RawMyExamplesPage => "pages_count" in item
			);

			const items = rawData.filter(
				(item): item is ParsedMyExample => "id" in item && "title_verbose" in item
			);

			setExamples(items);
			setPageCount(pageCountEntry?.pages_count || 1);
		}
	}, [searchExamples, categoryParam, tagParam, searchParam, pageParam, orderingParam]);

	useEffect(() => {
		fetchExamples();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [fetchExamples]);

	if (examples.length < 1) return null

	const convertCommandsToParams = (
		commands: { title: string; value: string }[]
	): Record<string, string> => {
		return Object.fromEntries(commands.map(({ title, value }) => [title, value]));
	};

	return (
		<div className={styles.resolves}>
			<div className={styles.resolves__title}>
				<h2>Мои решения</h2>
			</div>

			<FiltersUrl
				categories={categories}
				tags={tags}
				searchQuery={searchAutocomplete}
				mapItem={(example): { id: number; title: string } => ({
					id: example.id,
					title: (example as any).title_verbose,
				})}
			/>

			<div className={styles.resolves__cards}>
				{(isFetching && !globalLoading) ? (
					<div className={styles.loadingContainer}>
						<CircularProgress />
					</div>
				) : examples.length > 0 ? (
					<>
						{examples.map(example => (
							<ResolveCard
								key={example.id}
								title={example.title_verbose ?? "Без названия"}
								date={example.creation_date}
								status={example.status}
								tags={example.tags}
								params={example.params}
								onClick={() =>
									navigate(`/profile/my-example/${example.id}`, {
										state: { from: location.pathname + location.search },
									})
								}
							/>
						))}
						<div className={styles.resolves__cards__pagination}>
							<Pagination
								count={pageCount}
								page={pageParam}
								onChange={(_, value) => {
									const newParams = new URLSearchParams(searchParams);
									newParams.set("page", value.toString());
									navigate({ search: newParams.toString() }, { replace: true });
								}}
								color="primary"
								variant="outlined"
								shape="rounded"
								size="small"
								sx={{
									"& .MuiPaginationItem-root": {
										color: "var(--mui-palette-primary-main)",
										border: "none",
									},
								}}
							/>
						</div>
					</>
				) : (
					<div className={styles.resolves__nullList}>
						<h3>У вас пока нет решений</h3>
						<PrimaryButton label="Приступить к моделированию" link="/" />
					</div>
				)}
			</div>
		</div>
	);
};

export default ResolvesList;
