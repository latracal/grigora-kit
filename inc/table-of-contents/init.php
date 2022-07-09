<?php

if(!function_exists("grigora_get_toc")){
    function grigora_get_toc($content) {
        $headings = grigora_get_headings($content);
        if(count($headings)>0){
            ob_start();
            echo "<div class='grigora-table-of-contents'>";
            echo "<p><span class='grigora-toc-headline'>Table Of Contents </span>";
            echo "[<span class='toggle-toc custom-setting' title='collapse'>hide</span>]</p>";
            echo "<div class='heading'>";
            echo wp_kses( grigora_toc_print($headings, 0), array(
                'ol' => array(),
                'ul' => array(),
                'li' => array(),
                'a' => array(
                    'href' => array()
                ),
            ) );
            echo "</div>";
            echo "</div>";
            return ob_get_clean();
        }
        return "";
    }
}

if(!function_exists("grigora_single_heading")){
    function grigora_single_heading($heading, $flags){
    
        if($heading['tag'] == 2 && $flags[0]){
        }
        elseif($heading['tag'] == 3 && $flags[1]){
        }
        elseif($heading['tag'] == 4 && $flags[2]){
        }
        elseif($heading['tag'] == 5 && $flags[3]){
        }
        elseif($heading['tag'] == 6 && $flags[4]){
        }
        else{
            return "";
        }
        return "<li>"."<a href=#".str_replace(" ", "_", $heading['name']).">".$heading['name']."</a>"."</li>";
    }
}

if(!function_exists("grigora_toc_print")){
    function grigora_toc_print( $a, $depth) {
        $flags = array(
            grigora_get_setting("toc_heading2", 1),
            grigora_get_setting("toc_heading3", 1),
            grigora_get_setting("toc_heading4", 1),
            grigora_get_setting("toc_heading5", 1),
            grigora_get_setting("toc_heading6", 1),
        );

        $lowest_depth = 6;
        foreach($a as $key => $tag){
            if( $lowest_depth > $tag['tag'] ){
                $lowest_depth = $tag['tag'];
            }
        }
    
        $r = "<ol>";
        $depth = $lowest_depth;
        $depth_save = $lowest_depth;
        foreach($a as $key => $tag){
            // echo $tag['tag'] . " " . $depth;
            if($tag['tag']==$depth){
                $r = $r.grigora_single_heading($tag, $flags);
            }
            elseif($tag['tag']>$depth){
                $r = $r.str_repeat("<li><ol>", $tag['tag']-$depth).grigora_single_heading($tag, $flags);
                $depth = $tag['tag'];
            }
            else{
                $r = $r.str_repeat("</ol></li>", $depth - $tag['tag']).grigora_single_heading($tag, $flags);
                $depth = $tag['tag'];
    
            }
        }
        $r = $r.str_repeat("</ol>", $depth-$depth_save+1);
        return $r;
    }
}

if(!function_exists("grigora_get_headings")){
    function grigora_get_headings($content) {
        $headings = array();
        preg_match_all("/<h([1-6])(.*)>(.*)<\/h[1-6]>/", $content, $matches);
        
        for($i = 0; $i < count($matches[1]); $i++) {
            $headings[$i]["tag"] = $matches[1][$i];
    
            $att_string = $matches[2][$i];
            preg_match("/id=\"([^\"]*)\"/", $att_string , $id_matches);
    
            if(count($id_matches)>1){
            $headings[$i]["id"] = $id_matches[1];
            }
            
            $att_string = $matches[2][$i];
            preg_match_all("/class=\"([^\"]*)\"/", $att_string , $class_matches);
            for($j = 0; $j < count($class_matches[1]); $j++) {
            $headings[$i]["classes"][] = $class_matches[1][$j];
            }
            $headings[$i]["name"] = $matches[3][$i];
        }
        return $headings;
    }
}

if(!function_exists("grigora_headingwraps")){
    function grigora_headingwraps( $matches ) {
    
        $headings = array();
        
        if(count($matches)>2){
            foreach($matches[2] as $key => $heading){
            $h = "<h".$matches[1][$key]." ";
            $h = $h." ".$heading." ";
            $h = $h.">";
            $h = $h."<span class='grigora-toc-span' id='".str_replace(" ", "_", $matches[3][$key])."'></span>";
            $h = $h.$matches[3][$key];
            $h = $h."<span class='grigora-toc-span-end' ></span>";
            $h = $h."</h".$matches[1][$key].">";
            array_push($headings, $h);
            }
            return $headings;
        }
    
        return $headings;
    }
}

if(!function_exists("grigora_add_table_of_content")){
    function grigora_add_table_of_content($content) {
        if ( !in_array(get_post_type(), array("post", "page")) ) return $content;
    
        $location = grigora_get_setting("toc_location", "firstheading");
    
        $result = preg_match_all("/<h([1-6])(.*)>(.*)<\/h[1-6]>/", $content, $matches);
        $headingwrapped = grigora_headingwraps($matches);
        if(count($matches[1])>1 && $location=='firstheading'){
            $start   = strpos( $content, $matches[0][0] );
            $content = substr_replace( $content, grigora_get_toc($content), $start, 0 );
            foreach($headingwrapped as $key => $headingrep){
                $content = str_replace($matches[0][$key], $headingrep, $content);
            }
            return $content;
        }
        elseif($location=='top'){
            $paragraphs = explode("</p>", $content);
            $paragraphs_count = count($paragraphs);
            $new_content = '';
            for ($i = 0; $i < $paragraphs_count; $i++) {
                if ($i === 0) {
                $new_content .= get_toc($content);
                }
                $new_content .= $paragraphs[$i] . "</p>";
            }
            foreach($headingwrapped as $key => $headingrep){
            $new_content = str_replace($matches[0][$key], $headingrep, $new_content);
            }
            return $new_content;
        }
        else{
            $paragraphs = explode("</p>", $content);
            $paragraphs_count = count($paragraphs);
            $new_content = '';
            for ($i = 0; $i < $paragraphs_count; $i++) {
                if ($i === 1) {
                    $new_content .= grigora_get_toc($content);
                }
                $new_content .= $paragraphs[$i] . "</p>";
            }
            foreach($headingwrapped as $key => $headingrep){
                $new_content = str_replace($matches[0][$key], $headingrep, $new_content);
            }
            return $new_content;
        }
    }
}

add_filter('the_content', 'grigora_add_table_of_content');

/**
 * Add Table of Contents Submenu.
 */
if(!function_exists("grigora_kit_starter_toc_submenu")){
    function grigora_kit_starter_toc_submenu() {
        add_submenu_page(
            'grigora-kit',
            __( 'Table of Contents', 'grigora-kit' ),
            __( 'Table of Contents', 'grigora-kit' ),
            'manage_options',
            'grigora-kit-toc',
            'grigora_toc_page'
        );
    }
}

add_action('admin_menu', 'grigora_kit_starter_toc_submenu');

/**
 * Starter Templates Page.
 */
if(!function_exists("grigora_toc_page")){
    function grigora_toc_page() {

        if ( !current_user_can( 'manage_options' ) ) {
            wp_die( __( 'You do not have sufficient permissions to access this page.' , 'grigora-kit') );
        }
        echo '<div class="admin-container">';
        settings_errors();
        ?>

<div class="grigora-settings">
    <div class="tab-content">

    </div>
</div>
<?php
    }
}


if(!function_exists("grigora_toc_generate_css")){
    function grigora_toc_generate_css(){
        if ( ! is_admin() ) {
            $css = '.grigora-table-of-contents {padding: 1rem;border: 1px solid #aaa;border-radius: 5px;background-color: #fff;margin-bottom: 1rem;} .grigora-table-of-contents p {margin-bottom: 0;}.grigora-table-of-contents ol {margin-left:1rem;margin-bottom: 0;}.grigora-table-of-contents .grigora-toc-headline {font-weight: 700;}.grigora-table-of-contents .toggle-toc {cursor: pointer;color: #0170b9;}.grigora-table-of-contents .heading {margin-top: 0.5rem;}.grigora-table-of-contents a {text-decoration: none;}';
            wp_register_style( "grigora-toc", false );
            wp_enqueue_style( "grigora-toc" );
            wp_add_inline_style( "grigora-toc", $css );
        }
    }
}

add_action( 'wp_enqueue_scripts', 'grigora_toc_generate_css' );


