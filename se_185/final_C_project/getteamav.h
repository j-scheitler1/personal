#include <math.h>

void get_team_av(int *record, double actualVal[], double teamav, char teamgrade[5])
{
	teamav  = 0;
	for(int i = 0;i<*record;i++)
	{
	teamav = teamav + actualVal[i]; //Takes Actual Value and gets it for the whole team
	}
	
	teamav = teamav/ *record;
	
	if(teamav>=30) //Grading system based off standered deviation from avg NBA team value
	{
	teamgrade = "A";	
	printf("\nYour team went Nuclear\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	if(teamav<30 && teamav>=28)
	{
	teamgrade = "-A";
	printf("\nYour Team Played like Prime Shaq and Kobe\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	if(teamav<28 && teamav>=26)
	{
	teamgrade = "B+";
	printf("\nTeam Had Great Chemistry that game\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	if(teamav<26 && teamav>=24)
	{
	teamgrade = "B";
	printf("\nYour Team played pretty good\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	if(teamav<24&& teamav>=22)
	{
	teamgrade = "B-";
	printf("\nYour team did what they had to do\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}if(teamav<22 && teamav>=20)
	{
	teamgrade = "C+";
	printf("\nYour team played okay\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	if(teamav<20 && teamav>=18)
	{
	teamgrade = "C-";
	printf("\nYour team made a few mistakes\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	if(teamav<18 && teamav>=15)
	{
	teamgrade = "D";
	printf("\nYour Team Looked like Ben Simmons out there\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	if(teamav<15&& teamav>=0)
	{
	teamgrade = "F";
	printf("\nYour team better be running sprints tommorow\nTeam Value was %.2lf and Grade is %s", teamav, teamgrade);
	}
	
}
	