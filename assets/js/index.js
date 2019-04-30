/**
* 说明：js由adminlte改编所得，代码结构已做更改，部分内容有删减与添加（更易于后端人员理解---去除原型链与jq插件）
* 框架：bootscript+jQuery(3+3)
* 日期: 2019-4-29
* 作用：对2017年的项目中的例子做一个总结
*/

if (typeof jQuery === 'undefined') {
  throw new Error('system requires jQuery')
}

/* Layout
 *页面结构初始化
 */
$(document).ready(function(){
  'use strict';
  var Selector = {
    wrapper       : '.wrapper',
    contentWrapper: '.content-wrapper',
    mainFooter    : '.main-footer',
    mainHeader    : '.main-header',
    sidebar       : '.sidebar',
    content       : '.content',
    iframe        : '.main-iframe'
  };
  $('body').removeClass('hold-transition');
  // 初始化页面加载
  var current_url = window.location.href.split('#')[1];
  if(current_url) {
    $(Selector.iframe).attr('src', current_url);
  } else {
    $(Selector.iframe).attr('src', 'form.html');
  }
});



/* pushmenu 
 * 左侧菜单伸展与收缩
 *
 */
$(document).ready(function(){
  'use strict';

  var Selector = {
    collapsed     : '.sidebar-collapse',
    open          : '.sidebar-open',
    contentWrapper: '.content-wrapper',
    button        : '[data-toggle="push-menu"]',
  };

  var ClassName = {
    collapsed    : 'sidebar-collapse',
    open         : 'sidebar-open',
  };

  $(document).on('click', Selector.button, function (e) {
    e.preventDefault();
    toggleMenu();
  });

  $(Selector.contentWrapper).click(function () {
    if ($(window).width() <= 767 && $('body').hasClass(ClassName.open)) {
      closeMenu();
    }
  });

  function toggleMenu() {
    var windowWidth = $(window).width();
    var isOpen      = !$('body').hasClass(ClassName.collapsed);
    if (windowWidth <= 767) {
      isOpen = $('body').hasClass(ClassName.open);
    }
    if (!isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function closeMenu() {
    var windowWidth = $(window).width();
    if (windowWidth > 767) {
      $('body').addClass(ClassName.collapsed)
    } else {
      $('body').removeClass(ClassName.open + ' ' + ClassName.collapsed)
    }
  };

  function openMenu() {
    var windowWidth = $(window).width();
    if (windowWidth > 767) {
      $('body').removeClass(ClassName.collapsed)
    }
    else {
      $('body').addClass(ClassName.open)
    }
  };

});


/* Tree
 * 菜单树
 */
$(document).ready(function(){
  'use strict';

  var Default = {
    animationSpeed: 500,
    accordion     : true,
    followLink    : false,
    trigger       : '.treeview a'
  };
  
  var Selector = {
    tree        : '.tree',
    treeview    : '.treeview',
    treeviewMenu: '.treeview-menu',
    open        : '.menu-open, .active',
    data        : '[data-widget="tree"]',
    active      : '.active',
    iframe      : '.main-iframe'
  };

  var ClassName = {
    open: 'menu-open',
    tree: 'tree'
  };

  $(Selector.data).each(function () {
    $(this).addClass(ClassName.tree);
    $(Selector.treeview + Selector.active, $(this)).addClass(ClassName.open);
    $(this).on('click', Default.trigger, function (event) {
      var href = $(this).attr("href");
      if( href!== '#') {
       $(Selector.iframe).attr('src', href.slice(1))
      } 
      toggle($(this), event)
    });
  });

  function toggle(link, event) {
    var treeviewMenu = link.next(Selector.treeviewMenu);
    var parentLi     = link.parent();
    var isOpen       = parentLi.hasClass(ClassName.open);
    if (!parentLi.is(Selector.treeview)) {
      return;
    }
    if (!Default.followLink || link.attr('href') === '#') {
      event.preventDefault();
    }
    if (isOpen) {
      collapse(treeviewMenu, parentLi);
    } else {
      expand(treeviewMenu, parentLi);
    }
  };

  function expand(tree, parent) {
    if (Default.accordion) {
      var openMenuLi = parent.siblings(Selector.open);
      var openTree   = openMenuLi.children(Selector.treeviewMenu);
      collapse(openTree, openMenuLi);
    }
    parent.addClass(ClassName.open);
    tree.slideDown(Default.animationSpeed);
  }

  function collapse(tree, parentLi) {
    var collapsedEvent = $.Event(Event.collapsed);
    parentLi.removeClass(ClassName.open);
    tree.slideUp(Default.animationSpeed);
  };

})
