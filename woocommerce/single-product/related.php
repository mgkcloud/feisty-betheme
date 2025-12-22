<?php
/**
 * Related Products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/related.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     3.9.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $related_products ) : ?>

	<section class="related products">

		<?php
		$heading = apply_filters( 'woocommerce_product_related_products_heading', __( 'Related products', 'woocommerce' ) );

		if ( $heading ) :
			?>
			<h3><?php echo esc_html( $heading ); ?></h3>
		<?php endif; ?>
		
<?php
global $product;

// Get cross-sell IDs
$crosssell_ids = $product->get_cross_sell_ids();

if ( $crosssell_ids ) :

    $args = array(
        'post_type' => 'product',
        'ignore_sticky_posts' => 1,
        'no_found_rows' => 1,
        'posts_per_page' => -1,
        'post__in' => $crosssell_ids,
        'orderby' => 'rand'  // Random order, you can modify as needed
    );

    $crosssells_query = new WP_Query( $args );

    woocommerce_product_loop_start();

    while ( $crosssells_query->have_posts() ) : $crosssells_query->the_post();
        wc_get_template_part( 'content', 'product' );
    endwhile;

    woocommerce_product_loop_end();

    // Restore original post data
    wp_reset_postdata();

endif;
?>

	</section>
	<?php
endif;

wp_reset_postdata();
