// src/components/ui/crowd-canvas.jsx
// Adapted from Skiper UI "Skiper39" (Canvas_Landing_004). Attribution to Skiper UI
// is required on the free version. Original author: @gurvinder-singh02
"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

const CrowdCanvas = ({ src, rows = 15, cols = 7, speed = 1.6, bounce = 18, className = "", style }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let destroyed = false;

    // UTILS
    const randomRange = (min, max) => min + Math.random() * (max - min);
    const randomIndex = (array) => randomRange(0, array.length) | 0;
    const removeFromArray = (array, i) => array.splice(i, 1)[0];
    const removeItemFromArray = (array, item) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array) => array[randomIndex(array)];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      // small offset so people stand at slightly different depths near the bottom edge
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX, endX;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({ peep, props }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5) * speed);
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - bounce,
        },
        0,
      );
      return tl;
    };

    const walks = [normalWalk];

    const createPeep = ({ image, rect }) => {
      const peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (r) => {
          peep.rect = r;
          peep.width = r[2];
          peep.height = r[3];
        },
        render: (c) => {
          c.save();
          c.translate(peep.x, peep.y);
          c.scale(peep.scaleX, 1);
          c.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          );
          c.restore();
        },
      };
      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const img = document.createElement("img");
    const stage = { width: 0, height: 0 };
    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    const createPeeps = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          }),
        );
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        if (destroyed) return;
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((peep) => peep.render(ctx));
      ctx.restore();
    };

    const resize = () => {
      if (!allPeeps.length) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => peep.walk && peep.walk.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      if (destroyed) return;
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = src;

    // ResizeObserver so it also reacts when the hero height changes (not just the window)
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    return () => {
      destroyed = true;
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk && peep.walk.kill());
    };
  }, [src, rows, cols, speed, bounce]);

  // Inline styles so it works without Tailwind: fills its parent and sits on its bottom edge
  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
    />
  );
};

export { CrowdCanvas };
export default CrowdCanvas;