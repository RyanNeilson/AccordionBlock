const { Fragment } = wp.element;
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { ColorPicker, PanelBody, __experimentalBoxControl as BoxControl, RangeControl, ToggleControl, SelectControl, TextControl } from '@wordpress/components';
import './editor.scss';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { borderWidth, borderRadius, borderColor, id, margins, paddings, heading, headingTag, headingColor, headingBackground, bodyColor, bodyBackground, startsOpen, useCustomBorders, useCustomSpacings, useCustomHeaderColors, useCustomBodyColors } = attributes;
	const tags = [
		{
			label: 'H1',
			value: 'h1'	
		},
		{
			label: 'H2',
			value: 'h2'	
		},
		{
			label: 'H3',
			value: 'h3'	
		},
		{
			label: 'H4',
			value: 'h4'	
		},
		{
			label: 'H5',
			value: 'h5'	
		},
		{
			label: 'H6',
			value: 'h6'	
		},
		{
			label: 'P',
			value: 'p'	
		}	
	];
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

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Accordion ID', 'neilson-accordion-block')} initialOpen={false}>
					<TextControl label={__('Set Accordion ID', 'neilson-accordion-block')} onChange={id => setAttributes({ id })} value={id} />
				</PanelBody>
				<PanelBody title={__('Accordion Open State', 'neilson-accordion-block')} initialOpen={false}>
					<ToggleControl label={__('Starts in Opened State', 'neilson-accordion-block')} checked={startsOpen} onChange={() => setAttributes({startsOpen: !startsOpen})} />
				</PanelBody>
				<PanelBody title={__('Accordion Spacings', 'neilson-accordion-block')} initialOpen={false}>
					<ToggleControl label={__('Use Custom Spacings', 'neilson-accordion-block')} checked={useCustomSpacings} onChange={() => setAttributes({useCustomSpacings: !useCustomSpacings})} />
					<BoxControl values={margins} sides={['top', 'bottom']} units={[]} label={__('Accordion Margins', 'neilson-accordion-block')}  onChange={(val) => setAttributes({ ...margins, margins: { top: val.top, bottom: val.bottom } })} />
					<BoxControl values={paddings} sides={['top', 'bottom', 'left', 'right']} units={[]} label={__('Accordion Padding', 'neilson-accordion-block')} onChange={(val) => setAttributes({ ...paddings, paddings: { top: val.top, bottom: val.bottom, left: val.left, right: val.right } })} />
				</PanelBody>
				<PanelBody title={__('Accordion Borders', 'neilson-accordion-block')} initialOpen={false}>
					<ToggleControl label={__('Use Custom Borders', 'neilson-accordion-block')} checked={useCustomBorders} onChange={() => setAttributes({useCustomBorders: !useCustomBorders})} />
					<RangeControl value={borderWidth} label={__('Border Width', 'neilson-accordion-block')} onChange={(borderWidth) => setAttributes({ borderWidth })} min={0} max={50} />
					<RangeControl value={borderRadius} label={__('Border Radius', 'neilson-accordion-block')} onChange={(borderRadius) => setAttributes({ borderRadius })} min={0} max={50} />
					<div className="nab-section__label">{__('Border Color', 'neilson-accordion-block')}</div>
					<ColorPicker color={borderColor} disableAlpha defaultValue="#000000" onChangeComplete={(value) => { setAttributes({borderColor: value.hex})}} />
				</PanelBody>
				<PanelBody title={__('Accordion Header', 'neilson-accordion-block')} initialOpen={false}>
					<SelectControl label={__('Header HTML Tag', 'neilson-accordion-block')} options={tags} onChange={(headingTag) => setAttributes({ headingTag })} />
					<ToggleControl label={__('Use Custom Header Colors', 'neilson-accordion-block')} checked={useCustomHeaderColors} onChange={() => setAttributes({useCustomHeaderColors: !useCustomHeaderColors})} />
					<div className="nab-section__label">{__('Header Color', 'neilson-accordion-block')}</div>
					<ColorPicker color={headingColor} disableAlpha defaultValue="#000000" onChangeComplete={(value) => setAttributes({ headingColor: value.hex })} />
					<div className="nab-section__label">{__('Header Background', 'neilson-accordion-block')}</div>
					<ColorPicker color={headingBackground} disableAlpha defaultValue="#FFFFFF" onChangeComplete={(value) => setAttributes({ headingBackground: value.hex }) } />
				</PanelBody>
				<PanelBody title={__('Accordion Body', 'neilson-accordion-block')} initialOpen={false}>
					<ToggleControl label={__('Use Custom Body Colors', 'neilson-accordion-block')} checked={useCustomBodyColors} onChange={() => setAttributes({useCustomBodyColors: !useCustomBodyColors})} />
					<div className="nab-section__label">{__('Body Color', 'neilson-accordion-block')}</div>
					<ColorPicker color={bodyColor} disableAlpha defaultValue="#000000" onChangeComplete={(value) => setAttributes({ bodyColor: value.hex })} />
					<div className="nab-section__label">{__('Body Background', 'neilson-accordion-block')}</div>
					<ColorPicker color={bodyBackground} disableAlpha defaultValue="#FFFFFF" onChangeComplete={(value) => setAttributes({ bodyBackground: value.hex }) } />
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({ className: "nab-accordion" })}
				id={id ? id : ""}
				style={accordionStyles}	
			>
				<div 
					className={"nab-accordion__header"}
					style={headerStyles}
				>
					<RichText
						tagName={headingTag}
						className={"nab-accordion__header-title"}
						value={heading}
						onChange={(heading) => setAttributes({ heading })}
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
				>
					<InnerBlocks allowedBlocks={true} renderAppender={() => (<InnerBlocks.ButtonBlockAppender />)} />
				</div>
			</div>
		</Fragment>
	);
}
