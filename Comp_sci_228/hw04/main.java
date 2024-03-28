package comp_228_hw_04;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;
/*
 * @author Josh Scheitler
 */
public class main {
	
	public static void main(String []args) throws IOException 
	{
				//Ask for user input for file
				System.out.println("Please enter filename to decode:");
				Scanner scrn = new Scanner(System.in); //new scanner
				String fileName = scrn.nextLine();
				scrn.close();
				
				//Store Content in String and use .trim to get rid of white spaces
				String info = new String(Files.readAllBytes(Paths.get(fileName))).trim();
				int pos = info.lastIndexOf('\n');
				String pattern = info.substring(0, pos); // give pattern of tree
				String binCode = info.substring(pos).trim(); // trim white space and give coded message

				//iterate through each character in pattern and add to set of chars
				Set<Character> chars = new HashSet<>();
				for (char c : pattern.toCharArray()) {
					if (c != '^') { //make sure its not and ^ char
						chars.add(c); //add to chars
					}
				}
				
				//Use this as a makeshift dictionary to decoding the message
				String char_dictionary = chars.stream().map(String::valueOf).collect(Collectors.joining());
				
				
				MsgTree root = new MsgTree(pattern); //initialize tree
				MsgTree.printCodes(root, char_dictionary); //pass to print codes with makeshift dictionary
				System.out.println("");
				root.decode(root, binCode); //pass to decode message
			}
		
	}


