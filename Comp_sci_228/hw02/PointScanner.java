package edu.iastate.cs228.hw2;
 

import java.io.File;

/**
 * 
 * @author Josh Scheitller
 *
 */

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.Scanner;


/**
 * 
 * This class sorts all the points in an array of 2D points to determine a reference point whose x and y 
 * coordinates are respectively the medians of the x and y coordinates of the original points. 
 * 
 * It records the employed sorting algorithm as well as the sorting time for comparison. 
 *
 */
public class PointScanner  
{
	private Point[] points; 
	
	private Point medianCoordinatePoint;  // point whose x and y coordinates are respectively the medians of 
	                                      // the x coordinates and y coordinates of those points in the array points[].
	private Algorithm sortingAlgorithm;    
	
	protected String outputFileName;   // "select.txt", "insert.txt", "merge.txt", or "quick.txt"
	
	protected long scanTime; 	       // execution time in nanoseconds. 
	
	/**
	 * This constructor accepts an array of points and one of the four sorting algorithms as input. Copy 
	 * the points into the array points[].
	 * 
	 * @param  pts  input array of points 
	 * @throws IllegalArgumentException if pts == null or pts.length == 0.
	 */
	public PointScanner(Point[] pts, Algorithm algo) throws IllegalArgumentException
	{
		// First argument check.
		if (pts == null) {
			throw new IllegalArgumentException("RotationalPointScanner argument pts was null.");
		}
		
		// Second argument check
		if (pts.length == 0) {
			throw new IllegalArgumentException("RotationalPointScanner argument pts had length zero (no points passed)");
		}
		
	
		points = new Point[pts.length];
		
		for (int i = 0; i < pts.length; i++) {
			points[i] = pts[i];
		}
		
		// Assign the correct algorithm
		this.sortingAlgorithm = algo;
		
		// Assign the correct outputFileName
		if (algo.equals(Algorithm.SelectionSort)) {
			outputFileName = "select.txt";
		} else if (algo.equals(Algorithm.InsertionSort)) {
			outputFileName = "insert.txt";
		} else if (algo.equals(Algorithm.MergeSort)) {
			outputFileName = "merge.txt";
		} else {
			outputFileName = "quick.txt";
		}
		
		System.out.println(outputFileName);
	}

	
	/**
	 * This constructor reads points from a file. 
	 * 
	 * @param  inputFileName
	 * @throws FileNotFoundException 
	 * @throws InputMismatchException   if the input file contains an odd number of integers
	 */
	protected PointScanner(String inputFileName, Algorithm algo) throws FileNotFoundException, InputMismatchException
	{
		
		File inputFile = new File(inputFileName);// Load from File
		Scanner in = new Scanner(inputFile);
		
		
		ArrayList<Integer> temp = new ArrayList<Integer>();
		
		
		while (in.hasNextInt()) { // Make sure its Int and load from File
			temp.add(in.nextInt());
		}
		
		
		if ((temp.size() % 2) != 0) {// Check for an even number of integers in the file
			throw new InputMismatchException("Input file does not contain even number of values.  Length was: " + temp.size());
		}
		
		
		this.points = new Point[temp.size() / 2];
		
	
		int j = 0;
		for (int i = 0; i < temp.size(); i+=2) {	// Create the new Point object with sequential values in temp
			Point p = new Point(temp.get(i), temp.get(i+1));
			
			this.points[j] = p;
			j++;
		}
		
		// Assign the correct algorithm
		this.sortingAlgorithm = algo;
	}

	
	/**
	 * Carry out two rounds of sorting using the algorithm designated by sortingAlgorithm as follows:  
	 *    
	 *     a) Sort points[] by the x-coordinate to get the median x-coordinate. 
	 *     b) Sort points[] again by the y-coordinate to get the median y-coordinate.
	 *     c) Construct medianCoordinatePoint using the obtained median x- and y-coordinates.     
	 *  
	 * Based on the value of sortingAlgorithm, create an object of SelectionSorter, InsertionSorter, MergeSorter,
	 * or QuickSorter to carry out sorting.       
	 * @param algo
	 * @return
	 */
	public void scan()
	{
		AbstractSorter aSorter; 
		
		// Create an object for the supertype AbstractSorter to reference
		if (sortingAlgorithm == Algorithm.SelectionSort) {
			aSorter = new SelectionSorter(this.points);
		} else if (sortingAlgorithm == Algorithm.InsertionSort) {
			aSorter = new InsertionSorter(this.points);
		} else if (sortingAlgorithm == Algorithm.MergeSort) {
			aSorter = new MergeSorter(this.points);
		} else {
			aSorter = new QuickSorter(this.points);
		}
		
		int x = 0;
		int y = 0;
		
		
		// Get the start time
		long startTime = System.nanoTime();
					
		for (int i = 0; i < 3; i++) {
	
			aSorter.setComparator(i);
			
			// Start the sort
			if (i == 0 || i == 1) {
				aSorter.sort();
			}
			
			// Get the median values to create the medianCoordinatePoint
			if (i == 0) {
				x = aSorter.getMedian().getX();
			}
			
			if (i == 1) {
				y = aSorter.getMedian().getY();
				
				medianCoordinatePoint = new Point(x, y);
				aSorter.setReferencePoint(medianCoordinatePoint);

			}
			if (i == 2) {
				aSorter.sort();				
			}
		}
		
		long endTime = System.nanoTime();
			
		// Assign the total sort time
		this.scanTime = endTime - startTime;
		
	}
	
	
	/**
	 * Outputs performance statistics in the format: 
	 * 
	 * <sorting algorithm> <size>  <time>
	 * 
	 * For instance, 
	 * 
	 * selection sort   1000	  9200867
	 * 
	 * Use the spacing in the sample run in Section 2 of the project description. 
	 */
	public String stats()
	{
		String returnString = String.format("%-17s %-10d %-10d", this.sortingAlgorithm, this.points.length, this.scanTime);
		return(returnString);
	}
	
	
	/**
	 * Write MCP after a call to scan(),  in the format "MCP: (x, y)"   The x and y coordinates of the point are displayed on the same line with exactly one blank space 
	 * in between. 
	 */
	@Override
	public String toString()
	{
		String returnString = "";
		for (int i = 0; i < points.length; i++) {
			returnString = returnString + points[i].toString() + "\n";
		}
		
		return(returnString);
	}

	
	/**
	 *  
	 * This method, called after scanning, writes point data into a file by outputFileName. The format 
	 * of data in the file is the same as printed out from toString().  The file can help you verify 
	 * the full correctness of a sorting result and debug the underlying algorithm. 
	 * 
	 * @throws FileNotFoundException
	 */
	public void writePointsToFile() throws FileNotFoundException
	{
		try {
			System.out.println(this.outputFileName);
			PrintWriter out = new PrintWriter(this.outputFileName);
			
			out.println(this.toString());
			out.close();
		} catch (FileNotFoundException e) {
			throw new FileNotFoundException();
		}
	}	
}
