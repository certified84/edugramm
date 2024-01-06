import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

export const Card = (props: SvgProps) => (
  <Svg width={328} height={148} fill="none" {...props}>
    <G filter="url(#a)">
      <G clipPath="url(#b)">
        <Rect width={328} height={148} fill="url(#c)" rx={10} />
        <Path
          fill="url(#d)"
          fillOpacity={0.15}
          d="M44.566-76.643c-113.558-30.76-43.318 247.218-102.545 10.34L61.517-243.65l384.189 93.099L543.429-10.95 478.852 180.36 332.373 278c27.677-48.178 125.491-228.65-50.364-209.41C62.19 92.639 223.72-28.115 44.566-76.643Z"
        />
        <Path
          fill="url(#e)"
          fillOpacity={0.15}
          d="M-8.11 11.075c-117.634 1.948 26.958 249.534-95.653 38.38L-38.15-154.08l394.937-17.123L489.399-64.187l-8.976 201.714-91.573 125.231c13.227-53.964 35.069-245.277-128.549-178.012-204.522 84.08-82.827-76.742-268.41-73.67Z"
        />
        <Path
          fill="url(#f)"
          fillOpacity={0.15}
          d="M-14.599 93.45c-114.059 28.851 83.42 236.717-84.313 59.277l17.228-213.154L298.82-167.592l153.605 73.78 37.485 198.405-79.816 156.904c.51-55.559-2.693-260.808-146.544-157.841-179.813 128.708-98.208-55.72-278.15-10.205Z"
        />
        <Path
          fill="url(#g)"
          fillOpacity={0.15}
          d="M-11.463 170.687c-105.429 52.217 131.386 213.849-69.945 75.699l-28.034-212.003L239.973-150.49l165.696 39.789 78.415 186.065-44.993 170.192c-11.199-54.422-57.542-254.396-176.49-123.452-148.686 163.68-107.738-33.796-274.065 48.583Z"
        />
      </G>
    </G>
    <Defs>
      <LinearGradient
        id="c"
        x1={0}
        x2={278.439}
        y1={0}
        y2={191.743}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#297FFF" />
        <Stop offset={1} stopColor="#0160EF" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={-0.17}
        x2={375.06}
        y1={271.869}
        y2={-122.709}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={45.583}
        x2={296.637}
        y1={358.321}
        y2={-124.858}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={117.234}
        x2={250.89}
        y1={419.154}
        y2={-108.697}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={185.986}
        x2={205.516}
        y1={461.335}
        y2={-82.824}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <ClipPath id="b">
        <Rect width={328} height={148} fill="#fff" rx={10} />
      </ClipPath>
    </Defs>
  </Svg>
);

export const Filter = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#3C8AFF"
      d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
    />
  </Svg>
)