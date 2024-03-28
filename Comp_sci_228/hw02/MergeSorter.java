package edu.iastate.cs228.hw2;

import java.io.FileNotFoundException;
import java.lang.NumberFormatException; 
import java.lang.IllegalArgumentException;
import java.util.Arrays;
import java.util.InputMismatchException;

/**
 *  
 * @author Josh Scheitler

 *
 */

/**
 * 
 * This class implements the mergesort algorithm.   
 *
 */

public class MergeSorter extends AbstractSorter
{
	// Other private instance variables if you need ... 
	
	/** 
	 * Constructor takes an array of points.  It invokes the superclass constructor, and also 
	 * set the instance variables algorithm in the superclass.
	 *  
	 * @param pts   input array of integers
	 */
	public MergeSorter(Point[] pts) 
	{
		super(pts);
		super.algorithm = "mergesort";
	}


	/**
	 * Perform mergesort on the array points[] of the parent class AbstractSorter. 
	 * 
	 */
	@Override 
	public void sort()
	{
		mergeSortRec(this.points);
	}

	
	/**
	 * This is a recursive method that carries out mergesort on an array pts[] of points. One 
	 * way is to make copies of the two halves of pts[], recursively call mergeSort on them, 
	 * and merge the two sorted subarrays into pts[].   
	 * 
	 * @param pts	point array 
	 */
	private void mergeSortRec(Point[] pts)
	{
		int num = pts.length; //length of the array
		int num_2 = num / 2;
		
		
		if (num <= 1) { // If n <= 1, nothing to sort
			return;
		}
		
		// Create the new arrays for the left and right side
		Point[] left = new Point[num_2];
		Point[] right = new Point[num-num_2];
		
		
		for (int i = 0; i < num_2; i++) { //Pop Left
			left[i] = pts[i];
		}
		
	
		int k = 0;
		for (int i = num_2; i < num; i++) { //Pop Right
			right[k] = pts[i];
			k++;
		}
		
		// Recursively call mergeSortRec() for each new array
		mergeSortRec(left);
		mergeSortRec(right);
		
	
		Point[] temp = new Point[pts.length];
		temp = merge(left, right);
		
		for (int i = 0; i < temp.length; i++) {
			pts[i] = temp[i];
		}
		
	}

	/**
	 * Merge two Point arrays
	 * @param B the first Point array
	 * @param C the second Point array
	 */
	private Point[] merge(Point[] B, Point[] C) {
		int b = B.length;
		int c = C.length;
		
		// Create a new Point array
		Point[] D = new Point[b+c];
		
		int i = 0; 
		int j = 0; 
		int iterate = 0;
		while ((i < b) && (j < c)) {
			if (pointComparator.compare(B[i], C[j]) <= 0) {
				D[iterate++] = B[i];
				i++;
			} else {
				D[iterate++] = C[j];
				j++;
			}
		}
		if (i >= b) {
			for (int z = j; z < c; z++) {
				D[iterate++] = C[z];
			}
		} else {
			for (int z = i; z < b; z++) {
				D[iterate++] = B[z];
			}
		}
		return(D);
	}
}
