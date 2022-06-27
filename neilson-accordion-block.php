<?php
/**
 * Plugin Name:       Neilson Accordion Block
 * Description:       Custom Gutenberg block for creating collapsible content.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Ryan Neilson
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       neilson-accordion-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function neilson_accordion_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'neilson_accordion_block_block_init' );

function neilson_accordion_block_frontend_scripts() {
	if( has_block('neilson/accordion-block') ) {
		wp_enqueue_script('neilson-accordion-block', plugins_url( 'build/view.js', __FILE__), array(), filemtime( plugin_dir_path( __FILE__ ) . 'build/view.js' ));
	}
}
add_action( 'wp_enqueue_scripts', 'neilson_accordion_block_frontend_scripts' );