import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Popular from "./Routes/Popular";
import ComingSoon from "./Routes/ComingSoon";
import NowPlaying from "./Routes/NowPlaying";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Popular />,
        children: [
          {
            path: "movies/:movieId",
            element: <Popular />,
          },
        ],
      },
      {
        path: "/coming-soon",
        element: <ComingSoon />,
        children: [
          {
            path: "movies/:movieId",
            element: <ComingSoon />,
          },
        ],
      },
      {
        path: "/now-playing",
        element: <NowPlaying />,
        children: [
          {
            path: "movies/:movieId",
            element: <NowPlaying />,
          },
        ],
      },
    ],
  },
]);
