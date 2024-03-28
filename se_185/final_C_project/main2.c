#include <math.h> 
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "getcredit.h" //header files
#include "getteamav.h"

typedef struct //Struct where player data is stored
{
  char *name[50];		
  double points;
  double rebounds;
  double assists;
  double blocks;
  double steals;
  double ftmst;
  double fgmst;
  double turnovers;
} Stats;

int main(void) //Main Function
{
	double *score = 0;
	score = (double*)malloc(sizeof(double));
	char name[50];
	int enterstatbook = 0; // Variables for loops
	int startmachine = 0;
	int gradedata = 0;
	int getteamgrade = 0;
	
  printf("Welcome To StatBook\nPress 1 to Enter\n");
  scanf("%d", &enterstatbook);
  
  if(enterstatbook == 1) //if statement to enter program
  {	
	printf("\nYou're In!!\nThis program will give you player value with grades aswell as the team as a whole\nPress 1 to start the machine.\n");
	scanf("%d", &startmachine); //starts file open process
	if(startmachine = 1)
	{
	
  
  FILE *file; // file pointer variable for accessing the file
 
  file = fopen("file.txt", "r");// attempt to open file.txt in read mode to read the file contents

  if (file == NULL) // if the file failed to open, exit with an error message and status
  {
    printf("Error opening file.\n");
    return 1;
  }
  
  Stats stats[100]; // declaring struct in main function
 
  
  
  int read = 0; // read will be used to ensure each line/record is read correctly
  
  int records = 0;// records will keep track of the number of Players records read from the file
	
  do 
  {
    read = fscanf(file, //scan in with format that text file is, have to use %49 to give room to store name
                  "%49[^,],%lf,%lf,%lf,%lf,%lf,%lf,%lf,%lf\n",
                  stats[records].name, 
                  &stats[records].points, 
                  &stats[records].rebounds,
				  &stats[records].assists,
				  &stats[records].blocks,
				  &stats[records].steals,
				  &stats[records].ftmst,
				  &stats[records].fgmst,
				  &stats[records].turnovers); 
    
    if (read == 9) records++; //if fscan reads 9 values then 
    
    if (read != 9 && !feof(file)) //Will print error message if format is incorrect
    {
      printf("File format incorrect.\n");
      return 1;
    }

    if (ferror(file)) //If there was an error reading file message will be printed
    {
      printf("Error reading file.\n");
      return 1;
    }

  } while (!feof(file));

  fclose(file);// close the file as we are done working with it
  
  
  printf("\n%d records read.\n\n", records); // print out the number of records(players) read
  
  
  for (int i = 0; i < records; i++)// print out each of the records that was read 
    printf("%s %.0lf Points %.0lf Rebounds %.0lf Assists %.0lf Blocks %.0lf Steals %.0lf FT Missed %.0lf FG Missed %.0lf Turnovers\n", 
				stats[i].name, 
                stats[i].points, 
                stats[i].rebounds,
				stats[i].assists,
				stats[i].blocks,
				stats[i].steals,
				stats[i].ftmst,
				stats[i].fgmst,
				stats[i].turnovers);
  printf("\n");
  
  int correctstats = 0; //correct if statement variable
  double credit[records]; //player credit
  double actualval[records]; //player actualval
 
  printf("Enter the ending score of both teams added together\n");
  scanf("%lf", &score[0]); //useing dynamically allocated memory
 
  
  
  printf("\nIf These Are Correct Press 1\n");
  scanf("%d", &correctstats);
  
  
	for(int i=0;i<records;i++)//Get players credits from the game
		{
		credit[i] = stats[i].points + stats[i].rebounds + stats[i].assists + stats[i].blocks + stats[i].steals - stats[i].ftmst - stats[i].fgmst - stats[i].turnovers;	
		}
	
	get_AV(credit, &records, actualval); //use AV function to get actual value of player
	printf("\n");
	
	for(int i=0;i<records;i++)
	{
	printf("%s value is %.2lf\n", stats[i].name, actualval[i]); //print players actual values
	}
	
	printf("\nWould You Like To Grade Each Player\nPress 1 to do so\n");
	scanf("%d", &gradedata);
	
	if(gradedata == 1) //function to grade player on there game
	{		
	printf("\n");
	for(int i= 0; i < records;i++)
	{
		if(actualval[i]>=70)
		{
		printf("%s's Grade is a A+, he was an amazing asset for that game\n", stats[i].name);
		}
		if(actualval[i]<70 && actualval[i]>=55)
		{
		printf("%s's Grade is a A, he played a great game\n", stats[i].name);	
		}
		if(actualval[i]<55 && actualval[i]>=30)
		{
		printf("%s's Grade is a B+, he Contributed a lot during this game\n", stats[i].name);	
		}
		if(actualval[i]<30 && actualval[i]>=20)
		{
		printf("%s's Grade is a B, he played a good Game\n", stats[i].name);
		}
		if(actualval[i]<20 && actualval[i]>=10)
		{
		printf("%s's Grade is a B-, he played a decent Game\n", stats[i].name);	
		}
		if(actualval[i]<10 && actualval[i]>=0)
		{
		printf("%s's Grade is a C+, he played a okay Game\n", stats[i].name);
		}		
	}
	printf("\nNow lets see how your team played as a whole\nPress 1 to get a team grade\n");
	scanf("%d", &getteamgrade);
	
	double teamAv = 0;
	char teamGrade[5];
	double urscore = 0;
	double oppscore = 0;
	double p = 0;
	
	if(getteamgrade == 1)
	{
	get_team_av(&records, actualval, teamAv, teamGrade); //gives team grade
	
	for(int i = 0;i<records;i++) //line 181-198 calculate score based on team performance
	{
		p = p + actualval[i];
	}
	p = (p/(double) records);
	urscore = (p/100)*2*score[0];
	oppscore = score[0] - urscore;
	
	if(urscore>oppscore)
	{
	printf("\nBased on your teams performance we believe you won %.0lf - %.0lf",
	         urscore, oppscore);	
	}
	if(oppscore>urscore)
	{
	printf("\nBased on your teams performance we believe you lost %.0lf - %.0lf",
	         urscore, oppscore);
	}
	}
	printf("\nThanks for using statbook");
	free(score); // free scores memory
  return 0;
	}//start maching if statement
  }//enter statbook if statement
}
}





