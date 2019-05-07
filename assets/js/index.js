/**
* 说明：js由adminlte改编所得，代码结构已做更改，部分内容有删减与添加（更易于后端人员理解---去除原型链与jq插件）
* 框架：bootscript+jQuery(3+3)
* 日期: 2019-4-29
* 作用：对2017年的项目中的例子做一个总结
*/
if (typeof jQuery === 'undefined') {
  throw new Error('system requires jQuery')
}

// 自定义路由(根据实际情况定义 ---单独定义外部文件导入)
var router = [
  {path: '', name: '', children: {}}
]

/* Layout
 *页面结构初始化
 */
$(document).ready(function(){
  'use strict';
  var Selector = {
    wrapper       : '.wrapper',
    contentWrapper: '.content-wrapper',
    iframe        : '.main-iframe',
  };

  var ClassName = {
    open          : 'menu-open'
  };

  demoManageInit();
  // 初始化页面加载(路由，iframe，菜单动态加载)
  function demoManageInit() {
    $('body').removeClass('hold-transition');
    var current_url = window.location.href.split('#')[1];
    var activeDom = $('a[href="#'+current_url+'"]');
    var defaultDom = $('a[href="#form.html"]');
    if(current_url) {
      $(Selector.iframe).attr('src', current_url); 
      activeDom.parent('li').addClass('active');
      activeDom.parents('.treeview').addClass('active');
    } else {
      $(Selector.iframe).attr('src', 'form.html');
      defaultDom.parent('li').addClass('active');
      defaultDom.parents('.treeview').addClass('active');
    } 
  }
});


/* pushmenu 
 * 左侧菜单伸展与收缩
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
  };

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


/* Tree()
 * 菜单树
 */
$(document).ready(function(){
  'use strict';

  var Default = {
    animationSpeed: 500,
    accordion     : true,
    followLink    : false,
    clickAcitve   : true,
    trigger       : '.treeview a',
    triggerSingle : '.treeview-single a'
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
    tree: 'tree',
    treeview: 'treeview',
    active: 'active'

  };

  $(Selector.data).each(function () {
    $(this).addClass(ClassName.tree);
    $(Selector.treeview + Selector.active).addClass(ClassName.open);

    $(this).on('click', Default.trigger, function (event) {
      toggle($(this), event)
    });

    // 为了不影响已有结构，单独添加一级菜单点击事件(不阻止默认事件)。
    $(this).on('click', Default.triggerSingle, function() {
      singleMenu($(this));
    })

  });

  function toggle(link, event) {
    var treeviewMenu = link.next(Selector.treeviewMenu);
    var parentLi     = link.parent();
    var siblingLi    = parentLi.parents('.treeview').siblings('.treeview').find('.treeview-menu li');
    var isOpen       = parentLi.hasClass(ClassName.open);
    var isTreeview   = parentLi.hasClass(ClassName.treeview);
    var href = link.attr("href").slice(1);

    if(href) {
      $(Selector.iframe).attr('src', href);
    } 
    if(!isTreeview) {
      parentLi.addClass('active').siblings().removeClass('active');
      siblingLi.removeClass('active');
    }
    if (!parentLi.is(Selector.treeview)) {
      return;
    }
    if (!Default.followLink || link.attr('href') === '#') {
      event.preventDefault();
    }
    if(Default.clickAcitve) {
      $(Selector.open).removeClass(ClassName.active);
      Default.clickAcitve = false;
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
  };

  function collapse(tree, parentLi) {
    var collapsedEvent = $.Event(Event.collapsed);
    parentLi.removeClass(ClassName.open);
    tree.slideUp(Default.animationSpeed);
  };

  function singleMenu(link) {
    var treeviewMenu = link.next(Selector.treeviewMenu);
    var parentLi     = link.parent();
    var siblingLi    = parentLi.siblings('.treeview').find('.treeview-menu li');
    var href = link.attr("href").slice(1);
    if(href) {
      $(Selector.iframe).attr('src', href);
    } 
    expand(treeviewMenu, parentLi);
    siblingLi.removeClass('active');
  }
})


/* DirectChat()
 * ===该模块代码未做更改(直接重adminlte文件中提取出来使用)===
 * @Usage: $('#my-chat-box').directChat()
 *         or add [data-widget="direct-chat"] to the trigger
 */
+function ($) {
  'use strict';

  var DataKey = 'lte.controlsidebar';

  var Default = {
    slide: true
  };

  var Selector = {
    sidebar: '.control-sidebar',
    data   : '[data-toggle="control-sidebar"]',
    open   : '.control-sidebar-open',
    bg     : '.control-sidebar-bg',
    wrapper: '.wrapper',
    content: '.content-wrapper',
    boxed  : '.layout-boxed'
  };

  var ClassName = {
    open : 'control-sidebar-open',
    fixed: 'fixed'
  };

  var Event = {
    collapsed: 'collapsed.controlsidebar',
    expanded : 'expanded.controlsidebar'
  };

  // ControlSidebar Class Definition
  // ===============================
  var ControlSidebar = function (element, options) {
    this.element         = element;
    this.options         = options;
    this.hasBindedResize = false;

    this.init();
  };

  ControlSidebar.prototype.init = function () {
    // Add click listener if the element hasn't been
    // initialized using the data API
    if (!$(this.element).is(Selector.data)) {
      $(this).on('click', this.toggle);
    }

    this.fix();
    $(window).resize(function () {
      this.fix();
    }.bind(this));
  };

  ControlSidebar.prototype.toggle = function (event) {
    if (event) event.preventDefault();

    this.fix();

    if (!$(Selector.sidebar).is(Selector.open) && !$('body').is(Selector.open)) {
      this.expand();
    } else {
      this.collapse();
    }
  };

  ControlSidebar.prototype.expand = function () {
    if (!this.options.slide) {
      $('body').addClass(ClassName.open);
    } else {
      $(Selector.sidebar).addClass(ClassName.open);
    }

    $(this.element).trigger($.Event(Event.expanded));
  };

  ControlSidebar.prototype.collapse = function () {
    $('body, ' + Selector.sidebar).removeClass(ClassName.open);
    $(this.element).trigger($.Event(Event.collapsed));
  };

  ControlSidebar.prototype.fix = function () {
    if ($('body').is(Selector.boxed)) {
      this._fixForBoxed($(Selector.bg));
    }
  };

  // Private
  ControlSidebar.prototype._fixForBoxed = function (bg) {
    bg.css({
      position: 'absolute',
      height  : $(Selector.wrapper).height()
    });
  };

  // Plugin Definition
  // =================
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data(DataKey);

      if (!data) {
        var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
        $this.data(DataKey, (data = new ControlSidebar($this, options)));
      }

      if (typeof option == 'string') data.toggle();
    });
  }

  var old = $.fn.controlSidebar;

  $.fn.controlSidebar             = Plugin;
  $.fn.controlSidebar.Constructor = ControlSidebar;

  // No Conflict Mode
  // ================
  $.fn.controlSidebar.noConflict = function () {
    $.fn.controlSidebar = old;
    return this;
  };

  // ControlSidebar Data API
  // =======================
  $(document).on('click', Selector.data, function (event) {
    if (event) event.preventDefault();
    Plugin.call($(this), 'toggle');
  });

}(jQuery);

