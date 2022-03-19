/**
 * Created on Wed Mar 10 12:20:03 2021
 * 
 * @author: prowe
 * 
 * Solving Sudoku using
 * a constraint satisfaction problem with AC-3 and Backtracking
 * 
 * This is the main program that loads in, displays the board and
 * calls the solver.
 * 
 * by Penny Rowe
 * 2021/03/10
 * For AI and Software Engineering with Prof. Chambers
 * at the University of Puget Sound
 * Spring 2021, Spring 2022
 * 
 */

/**
 * A variable in a Sudoku CSP with domain {1, 2, 3, ..., 9}
 * The value of the variable may be fixed by the original problem.
 */
function Variable(row, col, nside, domainVals, fix=false) {
    // def __init__(self, row, col, nside, val={1, 2, 3, 4, 5, 6, 7, 8, 9},
    //              fix=False):
    //     Create a new variable with the domain specified.
    //         domain may be:
    //             - {1...9}
    //             - a single value
    //             - a collection
    this.row = row;
    this.col = col;
    this.maxDomainVal = nside;
    this.fixed = fix;
    this.domain = domainVals;
}


//     def replace(self, value):
//         """
//          Replace the domain of the variable with a value
//          @param val  The value to be added
//          @throws IllegalStateException  The domain is fixed
//          """
//         if self.fixed:
//             raise ValueError('The domain is fixed; cannot replace value.')
//         self.domain = {value}


//     def add(self, value):
//         """
//         	 Add a value to the domain of the variable
//         	 @param val  The value to be added
//         	 @throws IllegalStateException The domain is fixed
//         """
//         if self.fixed:
//             raise ValueError('The domain is fixed; cannot add value.')
//         self.domain.add(value)


//     def add_all(self, collection):
//         """
//         	Adds a collection of values to the domain of the variable
//         	@param input		A collection of integer values to be added
//         	@throws IllegalStateException  The domain is fixed
//         """
//         if self.fixed:
//             raise ValueError('The domain is fixed; cannot add collection.')
//         self.domain.union(collection)


//     def remove(self, val):
//         """
//         	Removes a value from the domain
//         	@param val  The value to be removed
//         	@throws IllegalStateException  The domain is fixed
//         @returns: False
//         """
//         if self.fixed:
//             raise ValueError('The domain is fixed; cannot remove value.')
//         self.domain.remove(val)

//     def clear(self):
//         """
//         	#
//         	# Removes all values from the domain
//         	#
//         	# @throws IllegalStateException
//         	# 			The domain is fixed
//         	#
//         """
//         if self.fixed:
//             raise ValueError('The domain is fixed; cannot clear values.')
//         self.domain = {}


//     def get_domain(self):
//         """
//         Returns the domain of the variable
//         @return The domain of the variable
//         """
//         return self.domain


//     def get_domain_size(self):
//         """
//         Returns the size of the variable's domain
//         @return The size of the variable's domain
//         """
//         return len(self.domain)


//     def get_only_value(self):
//         """
//         	Returns the only value in the variable's domain
//         @throws IllegalStateException The domain has more than 1 value or is empty
//         @return The only value in the variable's domain
//         """
//         if self.get_domain_size() != 1:
//             raise ValueError('Domain of one expected, but was 0 or > 1')

//         return next(iter(self.domain))


//     #def isfixed(self):
//     #    """
//     #    Returns true if domain is fixed
//     #    @return True if the domain is fixed and false otherwise
//     #    """
//     #    return self.fixed

//     def contains(self, value):
//         """
//         Returns true if domain contains value
//         @param value The value to be checked
//         @return True if the domain contains the value, false otherwise
//         """
//         return value in self.domain
