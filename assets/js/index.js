$(document).ready(function () {

     // 切换左侧导航栏</>图标
    var $menuSiderbar = $(".menu-sidebar-head a")
    
    $menuSiderbar.click(function () {
        $(this).children().toggleClass("glyphicon-menu-down glyphicon-menu-right");
        $(this).addClass('sider-active');
        $menuSiderbar.not(this).removeClass('sider-active');   
    });

    // 鼠标移入移出事件
    $menuSiderbar.hover(function () {
        $(this).addClass('sider-active');
        $menuSiderbar.not(this).removeClass('sider-active');
    });


    // 切换左侧导航栏的选中栏
    var sidebarBodyLi = $(".nav-sidebar-body .nav li");
    sidebarBodyLi.click(function () {
        sidebarBodyLi.not(this).removeClass("active");
    });


    // 动态创建iframe
    var $mainContent = $("#mainContent");
    var contentInMainContent = '';
    $(".nav-sidebar-body .nav li a").each(function () {

        var val = $(this).attr("href").substr(1);
        contentInMainContent += '<div id="' + val + '" class="tab-pane fade">'
                             +  '<iframe class="main-iframe" src="' + val + '.html" width="100%" frameborder="0"'
                             +  'scrolling="auto"></iframe>' 
                             +  '</div>';
    });
    $mainContent.html(contentInMainContent);
    $mainContent.find("div").first().addClass("active in");


    // iframe高度自适应(-50 页面底部保留50px)
    $(".main-iframe").on("load", function () {
        $(this).height($(window).height() - 50);
    });


    // 导航收缩
    var $toggleSidebar = $("#toggleSidebar");
    $toggleSidebar.click(function () {
        toggleSidebar.toggleClass("glyphicon-arrow-left glyphicon-menu-hamburger");
        $(".sidebar").toggle();
    });
    
});