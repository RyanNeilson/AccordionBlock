
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	const { id, borderWidth, borderRadius, borderColor, margins, paddings, heading, headingTag, headingColor, headingBackground, bodyColor, bodyBackground, startsOpen, useCustomBorders, useCustomSpacings, useCustomHeaderColors, useCustomBodyColors } = attributes;
	const borderStyles = useCustomBorders ? {
		border: `${borderWidth}px solid ${borderColor}`,
		borderRadius: `${borderRadius}px`,
	} : {};

	const marginStyles = useCustomSpacings ? {
		marginTop: margins.top,
		marginBottom: margins.bottom,
	} : {};

	const paddingStyles = useCustomSpacings ? {
		paddingTop: paddings.top,
		paddingBottom: paddings.bottom,
		paddingLeft: paddings.left,
		paddingRight: paddings.right,
	} : {};

	const headerColors = useCustomHeaderColors ? {
		backgroundColor: headingBackground,
		color: headingColor
	} : {};
	
	const bodyColors = useCustomBodyColors ? {
		backgroundColor: bodyBackground,
		color: bodyColor
	} :  {};

	const accordionStyles = {
		...borderStyles,
		...marginStyles
	}

	const headerStyles = {
		...headerColors,
		...paddingStyles
	}

	const bodyStyles = useCustomBorders ? {
		...bodyColors,
		...paddingStyles,
		borderTop: `${borderWidth}px solid ${borderColor}`
	} : {
		...bodyColors,
		...paddingStyles
	}

	const accordionClasses = startsOpen ? "nab-accordion open" : "nab-accordion";

	return (
		<div
			{...useBlockProps.save({ className: accordionClasses })}
			id={id ? id : ""}
			style={accordionStyles}
		>
			<div 
				className={"nab-accordion__header"}
				style={headerStyles}
				tabIndex="0"
				aria-expanded={startsOpen}
			>
				<RichText.Content
					tagName={headingTag}
					className={"nab-accordion__header-title"}
					value={heading}
				/>
				<div 
					className={"nab-accordion__header-icon-wrapper"}
				>
					<span className={"nab-accordion__header-icon dashicons dashicons-arrow-down"}></span>
				</div>
			</div>
			<div
				className={"nab-accordion__body"}
				role="region"
				style={bodyStyles}
				aria-hidden={!startsOpen}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
