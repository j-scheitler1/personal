package edu.iastate.cs228.hw2;

/**
 *  
 * @author Josh Scheitler

 *
 */

import java.util.Comparator;
import java.io.FileNotFoundException;
import java.lang.IllegalArgumentException; 
import java.util.InputMismatchException;

/**
 * 
 * This abstract class is extended by SelectionSort, InsertionSort, MergeSort, and QuickSort.
 * It stores the input (later the sorted) sequence. 
 *
 */
public abstract class AbstractSorter
{
	
	protected Point[] points;    // array of points operated on by a sorting algorithm. 
	                             // stores ordered points after a call to sort(). 
	
	protected String algorithm = null; // "selection sort", "insertion sort", "mergesort", or
	                                   // "quicksort". Initialized by a subclass constructor.
		 
	protected Comparator<Point> pointComparator = null;  
	
	private Point referencePoint = null; 	    

	
	// Add other protected or private instance variables you may need. 
	

	protected AbstractSorter()
	{
		// No implementation needed. Provides a default super constructor to subclasses. 
		// Removable after implementing SelectionSorter, InsertionSorter, MergeSorter, and QuickSorter.
	}
	
	
	/**
	 * This constructor accepts an array of points as input. Copy the points into the array points[]. 
	 * 
	 * @param  pts  input array of points 
	 * @throws IllegalArgumentException if pts == null or pts.length == 0.
	 */
	protected AbstractSorter(Point[] pts) throws IllegalArgumentException
	{
		
		if (pts == null) { //First Check
			throw new IllegalArgumentException("AbstractSorter argument pts was null.");
		}
		
		
		if (pts.length == 0) { //Second Check
			throw new IllegalArgumentException("AbstractSorter argument pts had length zero (no points passed)");
		}
		
		points = new Point[pts.length];
		
		for (int i = 0; i < pts.length; i++) {
			points[i] = pts[i];
		}
	}

		
	
	/**
	 * 
	 * @param p
	 * @throws IllegalArgumentException  if p == null
	 */
	public void setReferencePoint(Point p) throws IllegalArgumentException 
	{
		if (p == null) {
			throw new IllegalArgumentException("Point p is null in AbstractSorter.setReferencePoint");
		} else {
			referencePoint = p;
		}
	}
	

	/**
	 * Generates a comparator on the fly that compares by x-coordinate if order == 0, by y-coordinate
	 * if order == 1. Assign the 
     * comparator to the variable pointComparator. 
     *  
	 * 
	 * @param order  0   by x-coordinate 
	 * 				 1   by y-coordinate
	 * 			    
	 * 
	 * @throws IllegalArgumentException if order is less than 0 or greater than 1
	 *        
	 */
	public void setComparator(int order) throws IllegalArgumentException, IllegalStateException
	{
		 
		if (order < 0 || order > 2) {
			throw new IllegalArgumentException("Comparator order in AbstractSorter.setComparator is outside the interval [0,2]");
		}
		
		if (order == 2 && referencePoint == null) {
			throw new IllegalStateException("Abstractor.setComparator called when referencePoint is null.");
		}
		if (order == 0 || order == 1) {
			if (order == 0) {
				Point.xORy = true;
			} else {
				Point.xORy = false;
			}

			pointComparator = new Comparator<Point>() {
				@Override
				public int compare(Point p1, Point p2) {
					return(p1.compareTo(p2));
				}
			};
		} else {
		}
		
		
	}

	

	/**
	 * Use the created pointComparator to conduct sorting.  
	 * 
	 * Ought to be protected. Made public for testing. 
	 */
	public abstract void sort(); 
	
	
	/**
	 * Obtain the point in the array points[] that has median index 
	 * 
	 * @return	median point 
	 */
	public Point getMedian()
	{
		return points[points.length/2]; 
	}
	
	
	/**
	 * Copy's the array points[] onto the array pts[]. 
	 * 
	 * @param pts
	 */
	public void getPoints(Point[] pts)
	{
		// TODO 
		for (int i = 0; i < points.length; i++) {
			pts[i] = points[i];
		}
	}
	

	/**
	 * Swaps the two elements indexed at i and j respectively in the array points[]. 
	 * 
	 * @param i - the original Point object location
	 * @param j - the position to put the Point object 
	 */
	protected void swap(int i, int j)
	{
		Point temp = this.points[i];
		this.points[i] = this.points[j];
		this.points[j] = temp;
	}
}
