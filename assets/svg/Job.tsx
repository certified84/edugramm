import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const User = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#ADADAF"
      d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
    />
  </Svg>
);

export const Mail = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#ADADAF"
      fillRule="evenodd"
      d="M2.106 6.447A2 2 0 0 0 1 8.236V16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.236a2 2 0 0 0-1.106-1.789l-7-3.5a2 2 0 0 0-1.788 0l-7 3.5Zm1.48 4.007a.75.75 0 1 0-.671 1.342l5.855 2.927a2.75 2.75 0 0 0 2.46 0l5.852-2.926a.75.75 0 0 0-.67-1.341l-5.853 2.926a1.25 1.25 0 0 1-1.118 0l-5.856-2.928Z"
      clipRule="evenodd"
    />
  </Svg>
);

export const Link = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#ADADAF"
      d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"
    />
    <Path
      fill="#ADADAF"
      d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"
    />
  </Svg>
);

export const FileUpload = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#1472FF"
      fillRule="evenodd"
      d="M6.125 1.5H9.5a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H17a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H6.125a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
      clipRule="evenodd"
    />
    <Path
      fill="#1472FF"
      d="M14.75 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"
    />
  </Svg>
)

export const FileUploaded = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#F92020"
      fillRule="evenodd"
      d="M8.1 3.6a2.7 2.7 0 0 0-2.7 2.7v23.4a2.7 2.7 0 0 0 2.7 2.7h19.8a2.7 2.7 0 0 0 2.7-2.7V13.72a2.7 2.7 0 0 0-.79-1.91l-7.42-7.418a2.7 2.7 0 0 0-1.908-.79H8.1Zm4.05 15.3a1.35 1.35 0 1 0 0 2.7h11.7a1.35 1.35 0 1 0 0-2.7h-11.7Zm0 5.4a1.35 1.35 0 1 0 0 2.7h11.7a1.35 1.35 0 1 0 0-2.7h-11.7Z"
      clipRule="evenodd"
    />
  </Svg>
)