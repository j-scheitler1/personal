#include <math.h>

void get_AV(double credit[],int *record, double actualVal[])//function to get actual value, formula from Dean Oliver's Book Basketball On Paper
{
	for(int i=0;i<*record;i++)
	{
		actualVal[i]= (pow(credit[i], .6666)/21)*100;
	}
}