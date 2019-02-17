import React from 'react';
import PropTypes from 'prop-types';
import util from 'util';

/**
 * Takes props and returns a cloned map of children with a condition passed down
 * @function render
 * @param {object} props
 * @returns {function} render
 */
const render = (condition = false, children = null) => {
  return !!condition ? children : null;
};

/**
 * React function component
 * Takes props and returns a cloned map of children with a condition passed down
 * @function If
 * @param {object} props
 * @returns {function} render
 */
export const If = props => {
  return React.Children.map(props.children, child =>
    React.cloneElement(child, { condition: props.condition }),
  );
}
  

/**
 * React function component
 * Takes props and returns with props.children if props.condition is true
 * @function Then
 * @param {object} props
 * @returns {function} render
 */
export const Then = props => render(props.condition, props.children);

/**
 * React function component
 * Takes props and returns props.children if props.condition is not true
 * @function Else
 * @param {object} props
 * @returns {function} render
 */
export const Else = props => render(!props.condition, props.children);

/**
 * React function component
 * Takes props and returns props.children if props.condition is true
 * @function When
 * @param {object} props
 * @returns {function} render
 */
export const When = props => {
  return render(props.condition, props.children);
};

/**
 * React function component
 * Takes props and returns props.children if props.condition is not true
 * @function Unless
 * @param {object} props
 * @returns {function} render
 */
export const Unless = props => render(!props.condition, props.children);
