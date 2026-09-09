// types/articleParams.ts
export interface OptionType {
	title: string;
	value: string;
}

export interface ArticleState {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
}
