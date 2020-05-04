export class IndexOutOfArrayExecption {
    public message: string;
    public name: string;
    constructor(message: string) {
        this.message = message;
        this.name = 'IndexOutOfArrayException';
    }
}

export class ExtJsObject {
    private node: Array<any>;

    public type: string;

    public ready: (toDo: any) => void;

    constructor(element?: any, e_index?: any) {
        var re;

        if (typeof element === 'string') {
            re = document.querySelectorAll(element);
            if (e_index != undefined) {
                re = [re[e_index]];
            }
        } else if (element == undefined || element == document) {
            /**
             * @param toDo function that is called when the document has been loaded
             */
            this.ready = function (toDo: () => void) {
                document.addEventListener('DOMContentLoaded', toDo);
            };
            return this;
        } else if (typeof element === 'object') {
            if (element.length == undefined) {
                re = [element];
            } else if (e_index != undefined) {
                re = [element[e_index]];
            } else {
                re = element;
            }
        } else if (element.type == 'ExtJsObject') {
            return element;
        } else {
            return;
        }

        this.type = 'ExtJsObject';
        this.node = re;
    }

    /**
     * @param {String} html HTML to put inside the element or undefined or nothing
     * @return {String|Object} HTML that is inside the first element or the current instance.
     */
    html(html?: string) {
        if (html != undefined) {
            for (var i = 0; i < this.node.length; i++) {
                var e = this.node[i];

                if (typeof html === 'string' || typeof html === 'number') {
                    e.innerHTML = html;
                }
            }
            return this;
        } else {
            return this.node[0].innerHTML;
        }
    }

    /**
     * @param {String} text text to put inside the element or undefined or nothing
     * @return {String|Object} text that is inside the first element or the current instance.
     */
    text(text?: string) {
        if (text != undefined) {
            for (var i = 0; i < this.node.length; i++) {
                var e = this.node[i];

                if (typeof text === 'string' || typeof text === 'number') {
                    e.innerText = text;
                }
            }
            return this;
        } else {
            return this.node[0].innerText;
        }
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody clicks on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the click.
     */
    click(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('click', toDo);
                } else {
                    e.click();
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('click', function (event: MouseEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            } else {
                var x = e;
                let xe: any = x.querySelector(element);
                xe.click();
            }
        }
        return this;
    }

    dblclick(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('dblclick', toDo);
                } else {
                    e.dblclick();
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('dblclick', function (event: MouseEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            } else {
                var x = e;
                let xe: any = x.querySelector(element);
                xe.dblclick();
            }
        }
        return this;
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody hovers on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the hover.
     */
    hover(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e: HTMLDivElement = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('mouseover', toDo);
                } else {
                    e.click();
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('mouseover', function (event: MouseEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody leaves the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the leave.
     */
    leave(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e: HTMLDivElement = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('mouseleave', toDo);
                } else {
                    e.click();
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('mouseleave', function (event: MouseEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    }

    /**
     * @param index index of the element or undefined or nothing
     * @return {Object} a DOM element
     */
    get(index: any): any {
        if (index != undefined) {
            if (this.node[index] == undefined)
                throw new IndexOutOfArrayExecption(
                    'ExtJsObject.get undefined index node[' + index + ']'
                );
            return this.node[index];
        } else {
            if (this.node[0] == undefined)
                throw new IndexOutOfArrayExecption(
                    'ExtJsObject.get undefined index node[0]'
                );
            return this.node[0];
        }
    }

    exists(index?: any) {
        if (index != undefined) return this.node[index] != undefined;
        else return this.node.length != 0;
    }

    /**
     * @param value the height of the element (and units (em / px / cm, etc)) or undefined or nothing
     * @return {Object|Number} Object if value != undefined and Number if value == undefined
     */
    height(value?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (value !== undefined) {
                e.style.height = value;
            } else {
                return e.offsetHeight;
            }
        }
        return this;
    }
    /**
     * @param value the width of the element (and units (em / px / cm, etc)) or undefined or nothing
     * @return {Object|Number} Object if value != undefined and Number if value == undefined
     */
    width(value?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (value !== undefined) {
                e.style.width = value;
            } else {
                return e.offsetWidth;
            }
        }
        return this;
    }
    /**
     * @param classx class to add to the classlist of the element
     * @return {Object} the current instance of ExtJs
     */
    addClass(classx: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            e.classList.add(classx);
        }
        return this;
    }

    /**
     * @param classx class to add to the classlist of the element
     * @return {Object} the current instance of ExtJs
     */
    hasClass(classx: string) {
        return this.node[0].classList.contains(classx);
    }

    /**
     * @param classx class to remove from the classlist of the element
     * @return {Object} the current instance of ExtJs
     */
    removeClass(classx: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            e.classList.remove(classx);
        }
        return this;
    }

    /**
     * Delete the element(s)
     */
    remove() {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            e.parentElement.removeChild(e);
        }
    }
    /**
     * @param element_type element to createElement
     * @return {Array} element list in an ExtJsObject
     */
    child(element_type: string) {
        var e_list = [];
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            var elem = document.createElement(element_type);
            e.appendChild(elem);
            e_list.push(elem);
        }
        return $(e_list);
    }
    /**
     * @param prop The css proprety that we want to modify.
     * @param value The value that we want to assign to that property
     * @param i the index of the element (optional)
     */
    css(prop: keyof CSSStyleDeclaration, value?: string, i?: any) {
        var y = i;
        if (i == undefined) {
            i = 0;
        }
        if (value == undefined) {
            return this.node[i].style[prop];
        } else if (y != undefined) {
            this.node[i].style[prop] = value;
            return this;
        } else {
            for (let i = 0; i < this.node.length; i++) {
                var e = this.node[i];
                e.style[prop] = value;
            }
            return this;
        }
    }

    /**
     * @param attr The attribute that we want to modify
     * @param value The value that we want to assign to that atribute
     * @param i the index of the element (optional)
     */
    attr(attr: string, value?: string, i?: any) {
        var y = i;
        if (i == undefined) {
            i = 0;
        }
        if (value == undefined) {
            return this.node[i].getAttribute(attr);
        } else if (y != undefined) {
            this.node[i].style[attr] = value;
            return this;
        } else {
            for (let i = 0; i < this.node.length; i++) {
                var e = this.node[i];
                e.setAttribute(attr, value);
            }
            return this;
        }
    }

    /**
     * Returns the nearest parent of the element's
     * @param selector The selector of the nearest parent
     */
    parent(selector: string = undefined) {
        var parents = [];

        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];
            if (selector == undefined) {
                parents.push(e.parentElement);
            } else {
                parents.push(e.closest(selector));
            }
        }

        return $(parents);
    }
    /**
     * @param {String} html Text to put inside the element or undefined or nothing
     * @return {String|Object} Text that is inside the first element or the current instance.
     */
    value(text?: string) {
        if (text != undefined) {
            for (var i = 0; i < this.node.length; i++) {
                var e: HTMLTextAreaElement = this.node[i];

                if (typeof text === 'string' || typeof text === 'number') {
                    e.value = text;
                }
            }
            return this;
        } else {
            let node: HTMLTextAreaElement = this.node[0];
            return this.node[0].value;
        }
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody keypress on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the keypress.
     */
    keypress(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('keypress', toDo);
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('keypress', function (event: KeyboardEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody input on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the input.
     */
    input(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('input', toDo);
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('input', function (event: KeyboardEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody keydown on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the keydown.
     */
    keydown(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('keydown', toDo);
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('keydown', function (event: KeyboardEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody change on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the change.
     */
    change(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('change', toDo);
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('change', function (event: KeyboardEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    }

    /**
     * @param {Function|Undefined} toDo function that is called when somebody keyup on the element  or undefined or nothing
     * @param {String|Undefined} element specifies the element on which we are going to listen the keyup.
     */
    keyup(toDo?: (event?: Event) => void, element?: string) {
        for (var i = 0; i < this.node.length; i++) {
            var e = this.node[i];

            if (element === undefined) {
                if (toDo !== undefined) {
                    e.addEventListener('keyup', toDo);
                }
            } else if (toDo !== undefined) {
                var x = e;
                e.addEventListener('keyup', function (event: KeyboardEvent) {
                    if (x.querySelector(element) == event.target) {
                        let xe: any = x.querySelector(element);
                        xe.prototype.toDo = toDo;
                        xe.toDo();
                    }
                });
            }
        }
        return this;
    }

    /**
     * Returns the previous sibling of an element or a set of elements
     */
    prevSibling() {
        let siblings = [];

        for (var i = 0; i < this.node.length; i++) {
            var e: HTMLElement = this.node[i];

            siblings.push(e.previousSibling);
        }

        return $(siblings);
    }

    /**
     * Returns the next sibling of an element or a set of elements
     */
    nextSibling() {
        let siblings = [];

        for (var i = 0; i < this.node.length; i++) {
            var e: HTMLElement = this.node[i];

            siblings.push(e.nextSibling);
        }

        return $(siblings);
    }

    appendTo(el: ExtJsObject) {
        let element: HTMLElement = this.get(0);
        let parent: HTMLElement = el.get(0);
        parent.appendChild(element);
    }

    /**
     * Return the number of elements that match the pattern
     */
    count() {
        return this.node.length;
    }

    /**
     * Calls a callback for each element
     */
    forEach(callback: (index?: number) => void) {
        for (let i = 0; i < this.node.length; i++) {
            const element = this.node[i];
            callback.bind(element)(i);
        }
        return this;
    }

    /**
     * Add a style based on an object
     */
    //@ts-ignore
    cssObj(obj: { [id: keyof CSSStyleDeclaration]: string }) {
        let keys = Object.keys(obj);
        keys.forEach((key) => {
            //@ts-ignore
            this.css(key, obj[key]);
        });
        return this;
    }

    children(selector: string) {
        return $(this.node[0].querySelectorAll(selector));
    }

    only(index: number) {
        return $(this.node[index]);
    }
}
class AjaxRequest {
    private request(
        method: string,
        url: string,
        data: any,
        sucess: (data: string) => void,
        error?: () => void
    ) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                sucess(xhttp.responseText);
            } else if (xhttp.readyState == 4) {
                if (error != undefined) {
                    try {
                        error();
                    } catch (e) {}
                }
            }
        };
        xhttp.open(
            method == 'GET' || method == 'DELETE' ? 'GET' : 'POST',
            url,
            true
        );
        let d = '';
        if (data != undefined) {
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                if (i !== 0) {
                    d = d + '&';
                }
                d = d + keys[i] + '=' + data[keys[i]];
            }
            xhttp.setRequestHeader(
                'Content-type',
                'application/x-www-form-urlencoded'
            );
        }
        if (method == 'PUT' || method == 'DELETE')
            xhttp.setRequestHeader('x-http-method-override', method);
        if (d != '') xhttp.send(d);
        else xhttp.send();
    }

    /**
     * @param {String} url URL of the resource
     * @param {Function} callback function which is called when the request has been performed correctly
     * @param {Function} error_callback function which is called when the request has not been performed correctly
     */
    public GET(
        url: string,
        callback: (data: string) => void,
        error_callback: () => void = undefined
    ) {
        return this.request('GET', url, undefined, callback, error_callback);
    }
    /**
     * @param {String} url URL of the resource
     * @param {Function} callback function which is called when the request has been performed correctly
     * @param {Function} error_callback function which is called when the request has not been performed correctly
     */
    public DELETE(
        url: string,
        callback: (data: string) => void,
        error_callback: () => void = undefined
    ) {
        return this.request('DELETE', url, undefined, callback, error_callback);
    }
    /**
     * @param {String} url URL of the resource
     * @param {Array} data assoc array with the data that will be sent
     * @param {Function} callback function which is called when the request has been performed correctly
     * @param {Function} error_callback function which is called when the request has not been performed correctly
     */
    public POST(
        url: string,
        data: any,
        callback: (data: string) => void,
        error_callback: () => void = undefined
    ) {
        return this.request('POST', url, data, callback, error_callback);
    }
    /**
     * @param {String} url URL of the resource
     * @param {Array} data assoc array with the data that will be sent
     * @param {Function} callback function which is called when the request has been performed correctly
     * @param {Function} error_callback function which is called when the request has not been performed correctly
     */
    public PUT(
        url: string,
        data: any,
        callback: (data: string) => void,
        error_callback: () => void = undefined
    ) {
        return this.request('PUT', url, data, callback, error_callback);
    }
}
export var AR = new AjaxRequest();
/**
 *
 * @param {String|Object|Array} e
 * @param {Number} index
 */
export function $(e?: any, index?: any): ExtJsObject {
    if (e != undefined) {
        return new ExtJsObject(e, index);
    } else {
        return this;
    }
}
