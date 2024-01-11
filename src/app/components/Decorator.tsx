"use client";
import { CompositeDecorator } from "draft-js";

const blockRegex = (regex: RegExp, contentBlock: any, callback: any) => {
  const text = contentBlock.getText();
  if (regex.test(text)) callback(0, text.length);
};

// ! FUNCTIONALLY WISE IT IS WORKING FINE but I tried looking for a solution for error but I was not able to find one!
// ! NOTE: While rendering h1 to h6 in components is resulting is console warnings like: React does not recognize the `contentState, decoratedText,blockKey, entityKey, offsetKey` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `contentstate` instead. If you accidentally passed it from a parent component, remove it from the DOM element
// component: (props) => (
// <h1 {...props} className=" text-green-500">
//   {props.children}
// </h1>

const Decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback) =>
      blockRegex(/^\# .+$/, contentBlock, callback),

    component: (props) => <span className="text-2xl">{props.children}</span>,
  },
  {
    strategy: (contentBlock, callback) =>
      blockRegex(/^\* .+$/, contentBlock, callback),
    component: (props) => <strong>{props.children}</strong>,
  },
  {
    strategy: (contentBlock, callback) =>
      blockRegex(/^\*\* .+$/, contentBlock, callback),
    component: (props) => (
      <span className="text-red-500">{props.children}</span>
    ),
  },
  {
    strategy: (contentBlock, callback) =>
      blockRegex(/^\*\*\* .+$/, contentBlock, callback),
    component: (props) => <u className="">{props.children}</u>,
  },
]);

export default Decorator;
