import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
	currentState: ArticleStateType;
}

export const ArticleParamsForm = ({
	onApply,
	onReset,
	currentState,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	const handleFieldChange = <K extends keyof ArticleStateType>(
		field: K,
		value: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${isSidebarOpen ? styles.open : ''}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<div className={styles.formContent}>
						{/* Шрифт */}
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								handleFieldChange('fontFamilyOption', option)
							}
						/>

						{/* Размер шрифта */}
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => handleFieldChange('fontSizeOption', option)}
						/>

						{/* Цвет шрифта */}
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) => handleFieldChange('fontColor', option)}
						/>

						{/* ✅ Линия — обёрнута в div для изменения цвета через opacity */}
						<div className={styles.separatorWrapper}>
							<Separator />
						</div>

						{/* Цвет фона */}
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								handleFieldChange('backgroundColor', option)
							}
						/>

						{/* Ширина контента */}
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) => handleFieldChange('contentWidth', option)}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
