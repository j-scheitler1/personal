#include <math.h>

void predict_score(double totalscore[], double *teamactual)
{
	double urscore = 0;
	double oppscore = 0;
	double total;
	total = totalscore[0];
	printf("%lf %lf", *teamactual, totalscore);
	urscore = ((*teamactual*2)/100)*total;
	oppscore = total - urscore;
	
	
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