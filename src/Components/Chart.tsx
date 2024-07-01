/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface DataPoint {
  date: Date;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  themeColor: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, themeColor }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        resizeObserver.unobserve(wrapperRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!data.length || dimensions.width === 0 || dimensions.height === 0) return;

    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .style('background', '#0f172a')
      .style('overflow', 'visible');

    const xScale = d3
      .scaleTime()
      .domain([d3.min(data, (d) => d.date)!, d3.max(data, (d) => d.date)!])
      .range([0, dimensions.width]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.value)! * 0.9, d3.max(data, (d) => d.value)! * 1.1])
      .range([dimensions.height, 0]);

    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', `${themeColor}`)
      .attr('stroke-width', 2);

    const xAxis = d3.axisBottom<Date>(xScale).ticks(10);
    const yAxis = d3.axisLeft<number>(yScale).ticks(5);

    svg
      .select<SVGGElement>('.x-axis')
      .attr('transform', `translate(0, ${dimensions.height})`)
      .call(xAxis)
      .attr('font-size', '12px')
      // .attr('fill', 'red')
      .attr('font-family', 'Arial');

    svg
      .select<SVGGElement>('.y-axis')
      .call(yAxis)
      .attr('font-size', '12px')
      // .attr('fill', 'green')
      .attr('font-family', 'Arial');
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className="w-full h-64 md:h-96">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default LineChart;
