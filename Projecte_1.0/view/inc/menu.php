	<!-- Header -->
			<header id="header">
				<div class="inner">
					<a href="index.php?module=main" class="logo">GameBets</a>
					<nav id="nav">
						<a href="index.php?module=main">HOME</a>
						<a href="index.php?module=products&view=create_products">CREATE PRODUCTS</a>
						<a href="index.php?module=frontend_products&view=list_products">LIST PRODUCTS</a>
						<a href="index.php?module=generic">GENERIC</a>
						<a href="index.php?module=elements">ELEMENTS</a>
					</nav>
				</div>
			</header>
			<!--<a href="#menu" class="navPanelToggle"><span class="fa fa-bars"></span></a>-->
			<section id="title" class="emerald">
			    <div class="container">
			        <div class="row">
			            <div class="col-sm-6">
			                <h1><?php
			                    if (!isset($_GET['module'])) {
			                        echo "Home";
			                    } else if (isset($_GET['module']) && !isset($_GET['view'])) {
			                        echo "<a href='index.php?module=" . $_GET['module'] . "'>" . $_GET['module'] . "</a>";
			                    }else{
			                        echo "<a href='index.php?module=" . $_GET['module'] . "&view=".$_GET['view']."'>" . $_GET['module'] . "</a>";
			                    }
			                    ?></h1>
			            </div>
			        </div>
			    </div>
			</section>