package edu.iastate.cs228.hw3;

import java.util.ListIterator;

public class Test extends StoutList{
	
	public static <E> void main(String []args)
	{
		StoutList<Integer> dll = new StoutList();
		dll.add(5);
		dll.add(7);
		dll.add(8);
		dll.add(7);
		dll.add(2);
		dll.add(5);
		dll.add(7);
		dll.add(8);
		dll.add(7);
		dll.add(2);
		dll.add(8);
		
		dll.sort();
		//1. implement add(E item)
		System.out.println(dll.toStringInternal());
	
		/*2.Implements the hasNext() and next() methods of StoutIterator and implement the iterator()
		method/ At this point the List methods contains(Object) and toString() should work
		 */
		
		ListIterator<E> iter = (ListIterator<E>) dll.listIterator();
		while(iter.hasNext())
		{
			System.out.print(iter.next());
		}
		
		//Does toString work?
		System.out.println();
		System.out.print(iter.toString());
		
		//Does contains work?
		System.out.println();
		System.out.println(dll.contains(5));
		System.out.print(dll.contains(0));
		
		System.out.println();
		
		//3. Start StoutListIterator. Implement ListIterator methods
		dll.sort();
		System.out.print(dll.toStringInternal());
		
		
	}
}
