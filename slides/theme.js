import React from 'react'
import { yellow as theme } from "mdx-deck/themes"
import codeTheme from "prism-react-renderer/themes/duotoneLight"

class Provider extends React.Component {
  render() {
    const {children, mode, index, length, update} = this.props;

    if (mode !== 'NORMAL') {
      return <React.Fragment>{children}</React.Fragment>;
    }

    return (
      <React.Fragment>
        {children}
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <span>
            {index + 1}/{length}
          </span>
        </div>
      </React.Fragment>
    );
  }
}


export default {
  ...theme,
  Provider,
  codeSurfer: {
    ...codeTheme,
showNumbers: true
  },
  // Customize your presentation theme here.
  //
  // Read the docs for more info:
  // https://github.com/jxnblk/mdx-deck/blob/master/docs/theming.md
  // https://github.com/jxnblk/mdx-deck/blob/master/docs/themes.md

}
