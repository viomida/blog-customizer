import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { ColorPicker } from 'src/ui/color-picker/ColorPicker';
import { Separator } from 'src/ui/separator/Separator';

import {
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
	currentState: ArticleStateType;
}

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onApply,
	onReset,
	currentState,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const formRef = useRef<HTMLFormElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	// Закрытие сайдбара при клике вне
	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, onToggle]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
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
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${isOpen ? styles.open : ''}`}>
				<form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
					<div className={styles.formContent}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								handleFieldChange('fontFamilyOption', option)
							}
						/>

						<Select
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => handleFieldChange('fontSizeOption', option)}
						/>

						<Separator />

						<ColorPicker
							title='Цвет шрифта'
							selected={formState.fontColor}
							onChange={(option) => handleFieldChange('fontColor', option)}
						/>

						<ColorPicker
							title='Цвет фона'
							selected={formState.backgroundColor}
							onChange={(option) =>
								handleFieldChange('backgroundColor', option)
							}
						/>

						<Separator />

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
