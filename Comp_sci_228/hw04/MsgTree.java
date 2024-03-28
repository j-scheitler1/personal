package comp_228_hw_04;

import java.util.Stack;

/**
 * 
 * @author Josh Scheitler
 *
 */
public class MsgTree {
	public char payloadChar;
	public MsgTree left;
	public MsgTree right;
	// Need static char idx to the tree string for recursive solution
	private static int staticCharIdx = 0;

	/**
	 * Constructor building the tree from a string
	 * 
	 * @param encodingString string pulled from data file
	 */
	public MsgTree(String encodingString) {
		if (encodingString == null || encodingString.length() < 2) {
			return;
		}
		
		Stack<MsgTree> stk = new Stack<>();
		int index = 0;
		this.payloadChar = encodingString.charAt(index++);
		stk.push(this);
		MsgTree cur = this;
		String last_choice = "in";
		
		while (index < encodingString.length()) {
			MsgTree node = new MsgTree(encodingString.charAt(index++));
			if (last_choice.equals("in")) 
			{
				cur.left = node;
				if (node.payloadChar == '^') 
				{
					cur = stk.push(node);
					last_choice = "in";
				} 
				else 
				{
					if (!stk.empty())
						cur = stk.pop();
					last_choice = "out";
				}
			} 
			else 
			{ 
				cur.right = node;
				if (node.payloadChar == '^') 
				{
					cur = stk.push(node);
					last_choice = "in";
				} 
				else 
				{
					if (!stk.empty())
						cur = stk.pop();
					last_choice = "out";
				}
			}
		}
	}

	/**
	 * Constructor for a single node with null children
	 * 
	 * @param payloadChar
	 */
	public MsgTree(char payloadChar) {
		this.payloadChar = payloadChar;
		this.left = null;
		this.right = null;
	}

	/**
	 * Method to print characters and their binary codes
	 * 
	 * @param root
	 * @param code
	 */
	public static void printCodes(MsgTree root, String code) {
		System.out.println("character code\n------------------------");
		for (char character : code.toCharArray()) 
		{
			getCode(root, character, binCode = "");
			String characterRepresentation;
			if (character == '\n') {
			    characterRepresentation = "\\n";
			} else {
			    characterRepresentation = character + " ";
			}

			String formattedInfo = "    " + characterRepresentation + "    " + binCode;
			System.out.println(formattedInfo);
		}
	}

	private static String binCode;

	/**
	 * Gets code and recursivly calls itself setting the alphabet
	 * 
	 * @param root
	 * @param ch
	 * @param path
	 * @return
	 */
	private static boolean getCode(MsgTree root, char ch, String path) {
		if (root != null) 
		{
			if (root.payloadChar == ch) 
			{
				binCode = path;
				return true;
			}
			return getCode(root.left, ch, path + "0") || getCode(root.right, ch, path + "1");
		}
		return false;
	}

	/**
	 * Decodes message using the pulled code alphabet
	 * 
	 * @param codes
	 * @param msg
	 */
	public void decode(MsgTree codes, String msg) {
		System.out.println("MESSAGE:");
		MsgTree cur = codes;
		StringBuilder sb = new StringBuilder();
		
		for (int i = 0; i < msg.length(); i++) 
		{
			char ch = msg.charAt(i);
			
			if(ch == '0') // left if 0 and right if not
				{
				cur = cur.left;
				}
			else {
				cur = cur.right;
			}
			
			if (cur.payloadChar != '^')
			{
				getCode(codes, cur.payloadChar, binCode = "");
				sb.append(cur.payloadChar);
				cur = codes;
			}
		}
		
		System.out.println(sb.toString());
		statistc(msg, sb.toString());
	}

	/**
	 * Extra credit statistics. Pulls the encoded and decoded strings data to print
	 * 
	 * @param encodeStr
	 * @param decodeStr
	 */
	private void statistc(String encodeStr, String decodeStr) {
		System.out.println("STATISTICS:");
		System.out.println(String.format("Avg bits per char:\t%.1f", encodeStr.length() / (double) decodeStr.length())); //calculate average bits per char
		System.out.println("Total Characters:\t" + decodeStr.length());
		System.out.println(String.format("Space Saving:\t%.1f%%", (1d - decodeStr.length() / (double) encodeStr.length()) * 100)); //Calculate space savibgs
	}
}