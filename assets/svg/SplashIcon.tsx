import * as React from "react"
import Svg, { Rect, Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"

export const SplashIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={99}
    height={112}
    fill="none"
    {...props}
  >
    <Rect
      width={91.871}
      height={105.374}
      x={3.254}
      y={3.254}
      stroke="url(#a)"
      strokeWidth={6.509}
      rx={10.848}
    />
    <Circle
      cx={49.19}
      cy={55.941}
      r={29.68}
      stroke="url(#b)"
      strokeWidth={8.154}
    />
    <Path
      fill="url(#c)"
      d="M36.651 64.51V47.63h10.393v1.833h-8.367v5.642h7.691v1.833h-7.692v5.739h8.488v1.832H36.651Zm19.47.337c-1.254 0-2.363-.257-3.327-.772-.949-.53-1.696-1.302-2.243-2.315-.53-1.012-.795-2.266-.795-3.761V54.14c0-2.235.594-3.93 1.784-5.088 1.19-1.173 2.789-1.76 4.798-1.76 1.994 0 3.513.546 4.558 1.64 1.045 1.093 1.567 2.555 1.567 4.388v.12h-2.001v-.168c0-.804-.145-1.52-.434-2.146a3.23 3.23 0 0 0-1.35-1.471c-.611-.37-1.391-.555-2.34-.555-1.43 0-2.547.442-3.351 1.326-.804.868-1.206 2.09-1.206 3.666v3.954c0 1.575.402 2.805 1.206 3.69.803.867 1.929 1.301 3.375 1.301 1.415 0 2.452-.402 3.111-1.205.675-.804 1.013-1.873 1.013-3.207v-.41h-5.112V56.48h7.089v8.03H60.63v-1.833h-.337c-.177.353-.426.699-.748 1.036-.321.338-.755.611-1.302.82-.546.21-1.254.314-2.122.314Z"
    />
    <Circle cx={80.054} cy={19.29} r={6.752} fill="url(#d)" />
    <Defs>
      <LinearGradient
        id="a"
        x1={98.379}
        x2={0}
        y1={0}
        y2={111.882}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#005C7B" />
        <Stop offset={0.391} stopColor="#AFECFF" />
        <Stop offset={0.656} stopColor="#4B6269" />
        <Stop offset={1} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={82.947}
        x2={15.432}
        y1={22.184}
        y2={89.699}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#005C7B" />
        <Stop offset={0.391} stopColor="#AFECFF" />
        <Stop offset={0.656} stopColor="#4B6269" />
        <Stop offset={1} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={64.722}
        x2={34.697}
        y1={40.509}
        y2={64.697}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#005C7B" />
        <Stop offset={0.391} stopColor="#AFECFF" />
        <Stop offset={0.656} stopColor="#4B6269" />
        <Stop offset={1} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={86.805}
        x2={73.302}
        y1={12.539}
        y2={26.042}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#005C7B" />
        <Stop offset={0.391} stopColor="#AFECFF" />
        <Stop offset={0.656} stopColor="#4B6269" />
        <Stop offset={1} />
      </LinearGradient>
    </Defs>
  </Svg>
)