import { useState, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ColorPicker.module.scss';

type ColorPickerProps = {
	title?: string;
	selected: OptionType | null;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
};

export const ColorPicker = (props: ColorPickerProps) => {
	const { title, selected, onChange, onClose } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	const colorOptions: OptionType[] = [
		{ title: 'Черный', value: '#000000', className: 'bg-black' },
		{ title: 'Белый', value: '#FFFFFF', className: 'bg-white' },
		{ title: 'Серый', value: '#C4C4C4', className: 'bg-gray' },
		{ title: 'Розовый', value: '#FEAFE8', className: 'bg-pink' },
		{ title: 'Ярко-розовый', value: '#FD24AF', className: 'bg-fuchsia' },
		{ title: 'Жёлтый', value: '#FFC802', className: 'bg-yellow' },
		{ title: 'Зелёный', value: '#80D994', className: 'bg-green' },
		{ title: 'Голубой', value: '#6FC1FD', className: 'bg-blue' },
		{ title: 'Фиолетовый', value: '#5F0DEE', className: 'bg-purple' },
	];

	const handlePlaceholderClick = () => {
		setIsOpen(!isOpen);
	};

	const handleColorSelect = (color: OptionType) => {
		setIsOpen(false);
		onChange?.(color);
	};

	return (
		<div className={styles.container} ref={rootRef}>
			{title && (
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			)}
			<div
				className={styles.colorPickerWrapper}
				onClick={handlePlaceholderClick}
				data-is-active={isOpen}
				ref={placeholderRef}
				role='button'
				tabIndex={0}>
				<div className={styles.selectedColor}>
					<div
						className={styles.colorPreview}
						style={{ backgroundColor: selected?.value || '#000000' }}
					/>
					<Text>{selected?.title || 'Выберите цвет'}</Text>
				</div>
				<img src={arrowDown} alt='стрелка' className={styles.arrow} />
			</div>

			{isOpen && (
				<ul className={styles.colorDropdown}>
					{colorOptions.map((color) => (
						<li
							key={color.value}
							className={styles.colorOption}
							onClick={() => handleColorSelect(color)}>
							<div
								className={styles.colorPreview}
								style={{ backgroundColor: color.value }}
							/>
							<Text>{color.title}</Text>
							{selected?.value === color.value && (
								<span className={styles.checkmark}>✓</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
