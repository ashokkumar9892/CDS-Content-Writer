(function ($, document) {
	"use strict";

	function userCanWriteToFolder(nodeData)
	{
	    if (nodeData.content && nodeData.content.metadata) {
	        if(nodeData.content.metadata.globalWrite)
	        {
	            return true;
	        }

	        if(nodeData.content.metadata.extendPermissionToClient)
	        {
	            if (parseInt(nodeData.owner.clientId) === parseInt(sessionStorage.installationId) || (nodeData.content.metadata.ownerInstallations && _.contains(nodeData.content.metadata.ownerInstallations, sessionStorage.installationId)))
	            { 
	                return true;
	            }
	        }
	    }
            
	    if (nodeData.owner.userId == parseInt(sessionStorage.uid)) {
	        return true;
	    }

	    return false;
	}

	var initContextMenu = function(tree, selector, menu, actions) {
		tree.$container.on("mousedown.contextMenu", function(event) {
			var node = $.ui.fancytree.getNode(event);

			if (node) {
                $.contextMenu("destroy", "." + selector);
                if (node.data.id === 1 || node.data.id === 2)
                {
                    return;
                }
				node.setFocus(true);
				node.setActive(true);

				$.contextMenu({
					selector: "." + selector,
					build: function($trigger, e) {
					    node = $.ui.fancytree.getNode($trigger);
					    var menu = {};
					    var folderMenu = {
					        "Add": {
					            "name": "New",
					            "icon": "add",
					            "items": {
                                    "New.Folder": { "name": "Folder", "icon": "folder" },
                                    "New.LF": { "name": "Logic Fragment", "icon": "logicfragment" },
                                    "New.VS": { "name": "Value Set", "icon": "valueset" },
                                    "New.KM": { "name": "Knowledge Module", "icon": "knowledgemodule" },
                                    "New.PR": { "name": "Patient Record", "icon": "patientrecord" },
                                    "New.TC": { "name": "Test Case", "icon": "testcase" }
					                //DO NOT CHANGE MENU ORDER
					            }
					        },
					        "Rename": { "name": "Rename", "icon": "rename" },
					        "Delete": { "name": "Delete", "icon": "delete" },
					        "Paste": { "name": "Paste", "icon": "paste"},
					    };
					    if (sessionStorage.getItem("mode") == "measures")
					    {
					        folderMenu.Add.items["New.BB"] = { "name": "Building Block", "icon": "buildingblock" };
					        folderMenu.Add.items["New.Metric"] = { "name": "Metric", "icon": "metric" };
					        folderMenu.Add.items["New.MeasureProgram"] = { "name": "Measure Program", "icon": "measureprogram" };
					    }
					    else {
					        folderMenu.Add.items["New.CP"] = { "name": "Content Program", "icon": "contentprogram" };
					    }

					    var itemMenu = {
					        "Open": { "name": "Open", "icon": "open" },
					        "Rename": { "name": "Rename", "icon": "rename" },
					        "Copy": { "name": "Copy", "icon": "copy"},
					        "Delete": { "name": "Delete", "icon": "delete" }
					    };
					    var readOnlyMenu = {
					        "Open": { "name": "Open", "icon": "open" },
					        "Copy": { "name": "Copy", "icon": "copy" }					        
					    };

					    var hasMetadata = false;
					    
					    if (!node.data.isFolderType) {
					        if (node.parent.data.isFolderType && node.parent.data.content && node.parent.data.content.metadata) {
                                hasMetadata = true;

					            var parentMetadata = node.parent.data.content.metadata;
					            menu.Open = { "name": "Open", "icon": "open" };

					            if (parentMetadata.allowedRenameChildren)
					            {
					                menu.Rename = { "name": "Rename", "icon": "rename" };
					            }

					            menu.Copy = { "name": "Copy", "icon": "copy" };

					            if (parentMetadata.allowedDeleteChildren) {
					                menu.Delete = { "name": "Delete", "icon": "delete" };
					            }
					        }
					        else {
					            menu = itemMenu;
					        }
					    }
					    else {
					        if (node.data.content && node.data.content.metadata) {
					            hasMetadata = true;

					            if (node.data.content.metadata.allowedCreate && userCanWriteToFolder(node.data)) {
					                if (node.data.content.metadata.allowedChildTypes.length == 0) {
					                    menu.Add = {
					                        "name": "New",
					                        "icon": "add",
					                        "items": {
					                            "New.Folder": { "name": "Folder", "icon": "folder" },
					                            "New.LF": { "name": "Logic Fragment", "icon": "logicfragment" },
					                            "New.VS": { "name": "Value Set", "icon": "valueset" },
					                            "New.KM": { "name": "Knowledge Module", "icon": "knowledgemodule" },
					                            "New.PR": { "name": "Patient Record", "icon": "patientrecord" },
					                            "New.TC": { "name": "Test Case", "icon": "testcase" },
					                            "New.CP": { "name": "Content Program", "icon": "contentprogram" },
					                            "New.MeasureProgram": { "name": "Measure Program", "icon": "measureprogram" }
					                            //DO NOT CHANGE MENU ORDER
					                        }
					                    };
					                }
					                else {
					                    menu.Add = { "name": "New", "icon": "add", "items": {} };
					                        if (node.data.content.metadata.allowedChildTypes.indexOf(0) != -1) menu.Add.items["New.Folder"] = { "name": "Folder", "icon": "folder" };
					                        if (node.data.content.metadata.allowedChildTypes.indexOf(9) != -1) menu.Add.items["New.LF"] = { "name": "Logic Fragment", "icon": "logicfragment" };
					                        if (node.data.content.metadata.allowedChildTypes.indexOf(2) != -1) menu.Add.items["New.VS"] = { "name": "Value Set", "icon": "valueset" };
					                        if (node.data.content.metadata.allowedChildTypes.indexOf(1) != -1) menu.Add.items["New.KM"] = { "name": "Knowledge Module", "icon": "knowledgemodule" };
					                        if (node.data.content.metadata.allowedChildTypes.indexOf(3) != -1) menu.Add.items["New.PR"] = { "name": "Patient Record", "icon": "patientrecord" };
					                        if (node.data.content.metadata.allowedChildTypes.indexOf(4) != -1) menu.Add.items["New.TC"] = { "name": "Test Case", "icon": "testcase" };
					                        if (node.data.content.metadata.allowedChildTypes.indexOf(7) != -1) menu.Add.items["New.CP"] = { "name": "Content Program", "icon": "contentprogram" };
                                            if (node.data.content.metadata.allowedChildTypes.indexOf(100) != -1) menu.Add.items["New.BB"] = { "name": "Building Block", "icon": "buildingblock" };
                                            if (node.data.content.metadata.allowedChildTypes.indexOf(110) != -1) menu.Add.items["New.Metric"] = { "name": "Metric", "icon": "metric" };
                                            if (node.data.content.metadata.allowedChildTypes.indexOf(110) != -1) menu.Add.items["New.MeasureProgram"] = { "name": "Measure Program", "icon": "measureprogram" };
					                }
					            }

					            if (node.data.content.metadata.allowedRename && userCanWriteToFolder(node.data)) {
					                menu.Rename = { "name": "Rename", "icon": "rename" };
					            }

					            if (node.data.content.metadata.allowedDelete && userCanWriteToFolder(node.data)) {
					                menu.Delete = { "name": "Delete", "icon": "delete" };
					            }

					            if (node.data.content.metadata.allowedMoveIn && userCanWriteToFolder(node.data)) {
					                if (node.data.content.metadata.pasteMovesItem) {
					                    menu.Move = { "name": "Move Clipboard Item Here", "icon": "paste" };
					                }
					                else {
					                    menu.Paste = { "name": "Paste", "icon": "paste" };
					                }
					            }
					        }
					        else {
					            menu = folderMenu;
					        }
					    }

					    if (!hasMetadata) {
					        if (node.data.id === 3) {
					            menu = {
					                "Add": { "name": "New", "icon": "add", "items": { "New.VS": { "name": "Value Set", "icon": "valueset" } } },
					                "Paste": { "name": "Paste", "icon": "paste" }
					            };
					        }
					        else if (node.data.parent.id === 2 || node.data.owner.userId != parseInt(sessionStorage.uid)) {
					            if (sessionStorage.isRuleAdmin == "true") {}
                                else{
					                menu = readOnlyMenu;
					            }
					        }
					    }

						var menuItems = { };
						if($.isFunction(menu)) {
							menuItems = menu(node);
						} else if($.isPlainObject(menu)) {
							menuItems = menu;
						}

						return {
							callback: function(action, options) {
								if($.isFunction(actions)) {
									actions(node, action, options);
								} else if($.isPlainObject(actions)) {
									if(actions.hasOwnProperty(action) && $.isFunction(actions[action])) {
										actions[action](node, options);
									}
								}
							},
							items: menuItems
						};
					}
				});
			}
		});
	};

	$.ui.fancytree.registerExtension({
		name: "contextMenu",
		version: "1.0",
		contextMenu: {
            selector: "fancytree-title",
			    menu: {},
			    actions: {}
		    },
		    treeInit: function(ctx) {
			    this._super(ctx);
			    initContextMenu(ctx.tree,
                          ctx.options.contextMenu.selector || "fancytree-title",
                          ctx.options.contextMenu.menu,
                          ctx.options.contextMenu.actions);
		}
	});
}(jQuery, document));
