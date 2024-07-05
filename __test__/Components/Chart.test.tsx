import { cleanup, render, waitFor } from '@testing-library/react';
import * as d3 from 'd3';
import { vi } from 'vitest';
import LineChart, { DataPoint } from '@/Components/Chart';

// Mock ResizeObserver
const mockResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(() => callback([{ contentRect: { width: 500, height: 400 } }])),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', mockResizeObserver);

// Mock d3 methods used in the LineChart component
const mockD3Select = vi.fn().mockReturnValue({
  attr: vi.fn().mockReturnThis(),
  style: vi.fn().mockReturnThis(),
  selectAll: vi.fn().mockReturnThis(),
  data: vi.fn().mockReturnThis(),
  join: vi.fn().mockReturnThis(),
  append: vi.fn().mockReturnThis(),
  call: vi.fn().mockReturnThis(),
});

vi.doMock('d3', () => ({
  select: mockD3Select,
  scaleTime: vi.fn().mockReturnValue({
    domain: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
  }),
  scaleLinear: vi.fn().mockReturnValue({
    domain: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
  }),
  line: vi.fn().mockReturnValue({
    x: vi.fn().mockReturnThis(),
    y: vi.fn().mockReturnThis(),
    curve: vi.fn().mockReturnThis(),
  }),
  axisBottom: vi.fn().mockReturnValue(vi.fn()),
  axisLeft: vi.fn().mockReturnValue(vi.fn()),
  min: vi.fn((data, accessor) => Math.min(...data.map(accessor))),
  max: vi.fn((data, accessor) => Math.max(...data.map(accessor))),
  curveMonotoneX: vi.fn(),
}));

describe('LineChart', () => {
  const sampleData: DataPoint[] = [
    { date: new Date('2023-01-01'), value: 100 },
    { date: new Date('2023-06-01'), value: 200 },
  ];

  afterEach(() => {
    cleanup();
  });

  it('should render LineChart component', () => {
    const { container } = render(<LineChart data={sampleData} themeColor="#22c55e" />);

    // Check if the svg element is rendered
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should call d3 methods with correct arguments', () => {
    render(<LineChart data={sampleData} themeColor="#22c55e" />);

    // Ensure that useEffect hooks are triggered
    waitFor(() => {
      // Verify d3.select is called with svgRef
      expect(mockD3Select).toHaveBeenCalled();

      // Verify scaleTime and scaleLinear are called
      expect(d3.scaleTime).toHaveBeenCalled();
      expect(d3.scaleLinear).toHaveBeenCalled();

      // Verify d3.line is called and configured correctly
      expect(d3.line).toHaveBeenCalled();
    });
  });

  it('should use the correct theme color', () => {
    render(<LineChart data={sampleData} themeColor="#22c55e" />);

    // Verify the line stroke color is set correctly
    waitFor(() => expect(mockD3Select().attr).toHaveBeenCalledWith('stroke', '#22c55e'));
  });

  it('should resize the chart on container resize', () => {
    render(<LineChart data={sampleData} themeColor="#22c55e" />);

    // Mock ResizeObserver behavior
    const resizeObserverCallback = mockResizeObserver.mock.calls[0][0];
    resizeObserverCallback([{ contentRect: { width: 500, height: 400 } }]);

    // Verify the chart dimensions are updated correctly
    waitFor(() => expect(mockD3Select().attr).toHaveBeenCalledWith('width', 500));
    waitFor(() => expect(mockD3Select().attr).toHaveBeenCalledWith('height', 400));
  });

  it('should handle empty data', () => {
    render(<LineChart data={[]} themeColor="#22c55e" />);

    // Verify that d3 methods are not called when data is empty
    waitFor(() => expect(mockD3Select).not.toHaveBeenCalled());
  });
});
