import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticleState);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const applySettings = (newState: typeof defaultArticleState) => {
		setArticleState(newState);
		setIsSidebarOpen(false);
	};

	const resetSettings = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={toggleSidebar}
				onApply={applySettings}
				onReset={resetSettings}
				currentState={articleState}
			/>
			<Article />
		</main>
	);
};
