<script type="text/javascript" src="modules/frontend_products/view/js/jquery.bootpag.min.js"></script>
<script type="text/javascript" src="modules/frontend_products/view/js/list_products.js"></script>z
<link rel="stylesheet" href="modules/frontend_products/view/css/main.css" type="text/css" />
<br><br>

<center>
    <form name="search_prod" id="search_prod" class="search_prod">
        <input type="text" value="" placeholder="Search Product ..." class="input_search" id="keyword" list="datalist">
        <!-- <div id="results_keyword"></div> -->
        <input name="Submit" id="Submit" class="button_search" type="button" />

    </form>
</center>


<div id="results"></div>

<center>
    <div class="pagination_prods"></div>
</center>

<!-- modal window  -->


<section>
    <div class="container" id="product">


        <div class="media">
            <div class="pull-left">
                <div id="img_product" class="img_product"></div>
            </div>
            <h3 class="media-heading title-product" id="prod_name" />
        </div>
        <div id="info_prods">
            <p class="text-product" id="dis_date_prod" />
            <p class="text-product" id="exp_date_prod" />
            <p class="text-product" id="country" />
            <p class="text-product" id="province" />
            <p class="text-product" id="population" />
            <p class="text-product" id="status" />
            <div class="text-product"> <strong id="price"></strong></div>
        </div>
    </div>
</section>
