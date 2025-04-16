export function useActions(node, actions) {
    var actionReturns = [];
    if (actions) {
        for (var i = 0; i < actions.length; i++) {
            var actionEntry = actions[i];
            var action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                actionReturns.push(action(node, actionEntry[1]));
            }
            else {
                actionReturns.push(action(node));
            }
        }
    }
    return {
        update: function (actions) {
            if (((actions && actions.length) || 0) != actionReturns.length) {
                throw new Error('You must not change the length of an actions array.');
            }
            if (actions) {
                for (var i = 0; i < actions.length; i++) {
                    var returnEntry = actionReturns[i];
                    if (returnEntry && returnEntry.update) {
                        var actionEntry = actions[i];
                        if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                            returnEntry.update(actionEntry[1]);
                        }
                        else {
                            returnEntry.update();
                        }
                    }
                }
            }
        },
        destroy: function () {
            for (var i = 0; i < actionReturns.length; i++) {
                var returnEntry = actionReturns[i];
                if (returnEntry && returnEntry.destroy) {
                    returnEntry.destroy();
                }
            }
        },
    };
}
