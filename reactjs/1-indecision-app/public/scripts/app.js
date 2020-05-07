'use strict';

var visibility = false;

var toggle = function toggle() {
    visibility = !visibility;
    render();
};

var render = function render() {
    var visible = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Visibility Toggle'
        ),
        React.createElement(
            'button',
            { onClick: toggle },
            visibility ? 'Hide details' : 'Show details'
        ),
        visibility && React.createElement(
            'p',
            null,
            'The devil is in the detail'
        )
    );

    ReactDOM.render(visible, document.querySelector('#app'));
};
render();
